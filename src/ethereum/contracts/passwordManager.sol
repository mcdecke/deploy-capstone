pragma solidity ^0.4.20;

contract PasswordFactory {
    address[] public deployedPasswordBlocks;
      address public manager = msg.sender;
    event ContractCreated(address newAddress);

    function createPasswordBlock(string desc, string enc) public {
        address hooman = msg.sender;
        address newPasswordBlock = new PasswordBlock(desc, enc, hooman);
        deployedPasswordBlocks.push(newPasswordBlock);
        ContractCreated(newPasswordBlock);
    }

    function getDeployedPasswordBlocks() public view returns (address[]){
        return deployedPasswordBlocks;
    }
}

contract PasswordBlock {

  struct EncryptedBlock {
    string description;
    string encrypted;
  }

  EncryptedBlock[] public encryptedBlock;
    address public manager;

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }

//   function Managed (address sender) restricted {
//     manager = sender;
//   }




  function PasswordBlock(string description, string encrypted, address hooman) public /* Managed(msg.sender) */ {
    //   Managed(msg.sender);
    manager = hooman;
    EncryptedBlock memory newEncryptedBlock = EncryptedBlock({
      description: description,
      encrypted: encrypted
      });
      encryptedBlock.push(newEncryptedBlock);
  }


  function newPasswordBlock(string description, string encrypted) public restricted /*Managed(msg.sender)*/ {
    //   Managed(msg.sender);
    EncryptedBlock memory newEncryptedBlock = EncryptedBlock({
      description: description,
      encrypted: encrypted
      });
      encryptedBlock.push(newEncryptedBlock);
  }

  function editDeployedBlock(uint index, string description, string encrypted) restricted {
      encryptedBlock[index].description = description;
      encryptedBlock[index].encrypted = encrypted;
  }

  function getBlockCount() public view returns (uint256) {
      return encryptedBlock.length;
  }
//   function getSummary(string description, string encrypted) public view returns (
//     string, string, address
//     ) {
//       return (
//           description,
//           encrypted,
//           manager
//     );
//   }

}
