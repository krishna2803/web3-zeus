import { providers, Contract } from "ethers";
import ContractABI from "@/abi/vouches.json";
const contractAddress = "0x23dcB293c28d6587dC2D0ACd77b7C8C0f322734f";

const DoWithdraw = async () => {
    if (window.ethereum) {
        try {
            await window.ethereum.enable(); // Request user permission
            const provider = new providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new Contract(
                contractAddress,
                ContractABI,
                provider
            );
            const gasLimit = 200000; // You can adjust this value as needed

            const greeting = await contract.connect(signer).helloWorld({
                gasLimit,
            });

            alert(greeting);
        } catch (error) {
            alert("Error: " + error.message);
        }
    } else {
        alert(
            "Please install or enable MetaMask or a Web3-compatible browser extension."
        );
    }
};
export default DoWithdraw;