const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider')
const compiledFactory = require('./build/PasswordFactory.json')

const provider = new HDWalletProvider(
  'alarm inject negative life spawn casino notable cactus alarm local brief hand', 'https://rinkeby.infura.io/uihm9RCLPyR2bFeoMPWT'
);

const web3 = new Web3(provider);

const deploy = async () => {

  const accounts = await web3.eth.getAccounts();
// let factory = await new web3.eth.Contract(JSON.parse)

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({data: '0x' + compiledFactory.bytecode})
    .send({gas: '1000000', from: accounts[0]})
    .catch(console.log('oops'));

  console.log('contract deployed to', result.options.address);
};

deploy();




// const deploy = async () => {
//
//   const result = await new web3.eth.Contract(JSON.parse(interface))
//   .deploy({data: '0x' + bytecode, arguments: ['Hi there!']})
//   .send({gas: '1000000', gasPrice: web3.utils.toWei('2', 'gwei'), from: accounts[0]})
//   .catch();
//
//   console.log('contract deployed to', result.options.address);
// };
//
// deploy();
//



// const Web3 = require('web3');
// const ganache = require('ganache-cli')
// const web3 = new Web3(ganache.provider() )
//
// const compiledFactory = require('./build/PasswordFactory.json')
// const compiledPassword = require('./build/PasswordBlock.json')
//
// let accounts;
// let factory;
// let campaignAddress;
// let campaign;
//
// beforeEach(async () => {
//   accounts = await web3.eth.getAccounts()
//   factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
//     .deploy({data: compiledFactory.bytecode})
//     .send({from: accounts[0], gas: '1000000'})
//
//   await factory.methods.createPasswordBlock('100')
//   .send({
//     from: account[0],
//     gas: '1000000'
//   })
//
//   //saves the first campaignAddress in the var
//   [campaignAddress] = await factory.methods.getDeployedPasswordBlocks().call()
//
//   campaign = await new web3.eth.Contract(
//     JSON.parse(compiledPassword.interface),
//     campaignAddress
//   )
// })
