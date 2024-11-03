// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Votch {
   mapping (address => address[]) addressMap;
   mapping (address => uint256) public stakeMap; // Mapping to keep track of stakes

   // Function to add an address to the array associated with a specific address if it's not already present
   function addAddressIfNotExists(address _address, address _newAddress) public {
       require(stakeMap[msg.sender] > 0, "Insufficient stake to vouch"); // Require the sender to have a stake
       // Check if _newAddress is already in the array
       if (!isAddressPresent(_address, _newAddress)) {
           addressMap[_address].push(_newAddress);
       }
   }

   // Function to allow an address to participate in vouching by staking
   function participateInVouching(uint256 _stake) public payable {
       require(msg.value == _stake, "Stake amount does not match sent value"); // Ensure the correct amount is sent
       require(_stake >= 0.1 ether, "Stake must be at least 0.1 Ether"); // Ensure the stake is at least 0.1 Ether
       stakeMap[msg.sender] += _stake; // Increment the stake count for the sender
   }

   // Function to remove an address from the array associated with a specific address if it's already present
   function removeAddressifExists(address _address, address _removeAddress) public {
       // Only allow removal if the sender has a stake
       require(stakeMap[msg.sender] > 0, "Insufficient stake to remove vouch");
       // Check if _removeAddress is in the array and remove it
       uint256 length = addressMap[_address].length;
       for (uint256 i = 0; i < length; i++) {
           if (addressMap[_address][i] == _removeAddress) {
               // Move the last element into the place to delete
               addressMap[_address][i] = addressMap[_address][length - 1];
               // Remove the last element
               addressMap[_address].pop();
               break;
           }
       }
   }

   // Helper function to check if an address is present in the array associated with a specific address
   function isAddressPresent(address _address, address _checkAddress) public view returns (bool) {
       address[] memory array = addressMap[_address];
       for (uint256 i = 0; i < array.length; i++) {
           if (array[i] == _checkAddress) {
               return true;
           }
       }
       return false;
   }

   // Function to get the array of addresses associated with an address
   function getAddressArray(address _address) public view returns (address[] memory) {
       return addressMap[_address];
   }

   // Function to get the length of the address array associated with a specific address
   function vouches(address _address) public view returns (uint256) {
       return addressMap[_address].length;
   }
}
