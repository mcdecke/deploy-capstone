import Web3 from 'web3'

// const web3 = new Web3(window.web3.currentProvider)

let web3

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined'){
  //In the browser and metamask is running
  web3 = new Web3(window.web3.currentProvider)
} else {
  //On the server or metamask isn't running
  const provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/uihm9RCLPyR2bFeoMPWT')

  web3 = new Web3(provider)
}

export default web3
