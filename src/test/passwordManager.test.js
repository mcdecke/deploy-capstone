const Web3 = require('web3');
const ganache = require('ganache-cli')
const web3 = new Web3(ganache.provider() )

// const compiledFactory = require('./build/PasswordFactory.json')\
const compiledFactory = require('../ethereum/build/PasswordFactory.json')
const compiledPassword = require('../ethereum/build/PasswordBlock.json')

let accounts;
let factory;
let passwordAddress;
let password;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({data: compiledFactory.bytecode})
    .send({from: accounts[0], gas: '1000000'})

  await factory.methods.createPasswordBlock('100')
  .send({
    from: account[0],
    gas: '1000000'
  })

  //saves the first passwordAddress in the var
  const passwordAddress = await factory.methods.getDeployedPasswordBlocks().call()

  password = new web3.eth.Contract(
    JSON.parse(compiledPassword.interface),
    passwordAddress
  )
})

describe('Password Factory', () => {
  it('deploys a factory and an instance of the password block', ()=>{
    assert.ok(factory.options.address)
    assert.ok(password.options.address)
  })
})
