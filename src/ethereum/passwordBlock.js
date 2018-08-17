import web3 from './web3'
import PasswordBlock from './build/PasswordBlock.json'

export default address => {
  return new web3.eth.Contract(JSON.parse(PasswordBlock.interface), address)
}
