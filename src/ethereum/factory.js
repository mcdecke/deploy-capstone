import web3 from './web3'

import PasswordFactory from './build/PasswordFactory.json'

//define the deployed instance of our contract factory
const instance = new web3.eth.Contract(
  JSON.parse(PasswordFactory.interface),
  '0x47e40eD671C03f9fa19e39C27700f692Ff38b9f0'
)

export default instance;
