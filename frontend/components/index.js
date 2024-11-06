

const [input, setInput] = useState<{[key]: string}>({"x": "1", "y": "2"});

const { address, connector, isConnected } = useAccount()
const { connect, connectors } = useConnect({
  connector: new InjectedConnector(),
})

const contractCallConfig = {
  address: "0x026587dA594ca25533aadfa4d48449f6f242Eb8F",
  abi
}

const { write, data, error, isLoading, isError } = useContractWrite({
  ...contractCallConfig,
  functionName: "verify",
})

  const {
  data: receipt,
  isLoading: isPending,
  isSuccess,
} = useWaitForTransaction({ hash: data?.hash })


// Handles input state
const handleChange = e => {
  e.preventDefault();
  setInput({...input, [e.target.name]: e.target.value});
};

const calculateMainProof = async () => {
  const proofGeneration = new Promise(async (resolve, reject) => {
    const inputs = {
      x: "2",
      y: "3"
    }
    const { witness, returnValue } = await noirs.main.execute(inputs);
    const { publicInputs, proof } = await backends.main.generateIntermediateProof(witness);

    // Verify the same proof, not inside of a circuit
    const verified = await backends.main.verifyIntermediateProof({proof, publicInputs});

    // Now we will take that inner proof and verify it in an outer proof.
    const { proofAsFields, vkAsFields, vkHash } = await backends.main.generateIntermediateProofArtifacts(
      {publicInputs, proof},
      1, // 1 public input
    );

    setMainProofArtifacts({ returnValue: returnValue, proof, publicInputs, proofAsFields, vkAsFields, vkHash })

    resolve(true)
  });

  toast.promise(proofGeneration, {
    pending: 'Generating proof',
    success: 'Proof generated',
    error: 'Error generating proof',
  });

};

const calculateRecursiveProof = async () => {
  const proofGeneration = new Promise(async (resolve, reject) => {

    const aggregationObject  = Array(16).fill(
      '0x0000000000000000000000000000000000000000000000000000000000000000',
    );
    const recInput = {
      verification_key: mainProofArtifacts.vkAsFields.map(e => e.toString()),
      proof: mainProofArtifacts.proofAsFields,
      public_inputs: ["0x" + input["y"]],
      key_hash: mainProofArtifacts.vkHash,
      input_aggregation_object: aggregationObject,
    }

    const { witness, returnValue } = await noirs.recursive.execute(recInput);


    const newBackend = new BarretenbergBackend(circuits.recursive, { threads: 8 })
    
    const { publicInputs, proof } = await newBackend.generateFinalProof(witness);

    setBackends({main: backends.main, recursive: newBackend})

    setRecursiveProofArtifacts({ returnValue: returnValue , proof, publicInputs, proofAsFields: [], vkAsFields: [], vkHash: "" })

    resolve(proof);
  });

  toast.promise(proofGeneration, {
    pending: 'Generating recursive proof',
    success: 'Recursive proof generated',
    error: 'Error generating recursive proof',
  });
}

const verifyProof = async () => {
  if (recursiveProofArtifacts) {
    const proofVerification = new Promise(async (resolve, reject) => {
      const { proof, publicInputs } = recursiveProofArtifacts;
      
      const verification = await backends.recursive.verifyFinalProof({ proof, publicInputs });

      await noirs.recursive.destroy();

      const ethers = new Ethers();

      const onChainVer = await ethers.contract.verify(proof, publicInputs);

      resolve(onChainVer);
    });

    toast.promise(proofVerification, {
      pending: 'Verifying recursive proof',
      success: 'Recursive proof verified',
      error: 'Error verifying recursive proof',
    });

    // ON-CHAIN VERIFICATION IS BUGGED, track https://github.com/noir-lang/noir/issues/3166
    // write?.({
    //   args: [bytesToHex(proof), publicInputs.map((pi : Uint8Array) => bytesToHex(pi))]
    // })
  }
};

  // Verifier the proof if there's one in state
useEffect(() => {
  if (mainProofArtifacts) {
    calculateRecursiveProof();
  }
}, [mainProofArtifacts]);

// Verifier the proof if there's one in state
useEffect(() => {
  if (recursiveProofArtifacts) {
    verifyProof();
  }
}, [recursiveProofArtifacts]);

const init = async () => {
  const circuits = {
    main: await getCircuit("main"),
    recursive: await getCircuit("recursion")
  }
  setCircuits(circuits)

  const backends = {
    main: new BarretenbergBackend(circuits.main, { threads: 8 }),
    recursive: new BarretenbergBackend(circuits.recursive, { threads: 8 })
  }

  setBackends(backends)

  const noirs = {
    main: new Noir(circuits.main, backends.main),
    recursive: new Noir(circuits.recursive, backends.recursive)
  };
  await noirs.main.init()
  await noirs.recursive.init()

  setNoirs(noirs)
}

useEffect(() => {
    if (!backends || !circuits || !noirs) {
      init()
    }
}, [])
