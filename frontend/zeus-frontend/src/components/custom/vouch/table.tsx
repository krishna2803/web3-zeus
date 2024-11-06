import ListItem from "./listItem";

// const ethers = require("ethers");
// const contractAddress = "0x86b87B83B371D8Ea78E071C75a502fbb735797C6"

// const DoWithdraw = async () => {
//     if (window.ethereum){
//         const provider = new ethers.providers.Web3Provider(window.ethereum);
//         const signer = provider.getSigner();
//         const contract = new ethers.Contract(contractAddress, abi, signer);
//         const transaction = await contract.withdraw();
//         await transaction.wait();
//         console.log("Withdrawn");
//     }
// }

export default function VouchedProjectsTable() {
  return (
    <div className="min-w-[30rem] mx-auto">
      <h1 className="text-xl pt-8 font-bold">
        The address you vouched for: 
      </h1>
      <ul className="pb-10 pt-4 mx-auto divide-gray-200 dark:divide-gray-700">
        <ListItem address="0xefccacde8d300b56a9dd3e015908871dfb43e286" />
      </ul>
    </div>
  );
}
