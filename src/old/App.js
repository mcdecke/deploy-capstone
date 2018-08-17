import React, {Component} from 'react';
// import logo from './logo.svg';
// import './App.css';
import web3 from './web3'
import Passwords from './components/Passwords'
import Encrypt from './components/Encrypt'
import Decrypt from './components/Decrypt'
import QrCode from './components/QrCode'
// const bcrypt = require('bcryptjs');
// const AES = require("crypto-js/aes");
// const SHA256 = require("crypto-js/sha256");
const QRCode = require('qrcode')
const canvas = document.getElementById('canvas')
const CryptoJS = require("crypto-js")

class App extends Component {

  state = {
    address: '', //'0x...'
    message: 'Click a button to get started',
    encryptedPasswords: 'encrypted',
    decryptedPasswords: [],
    // superSecretKey: 'superSecretKey',
    qrCode: '',
    passwordList: []
  }

  //updates eth address and adds qr code
  onSubmit = async (event) => {
    event.preventDefault()
    const accounts = await web3.eth.getAccounts();
    const chain = web3.eth.net.getId()
    .then(console.log);
    if (!accounts[0]) {
      this.setState({message: 'Please open metamask'})
    } else {
      this.setState({message: `Your ethereum address is ${accounts[0]}`})
    }
    QRCode.toCanvas(document.getElementById('canvas'), accounts[0], function (error, url) {
      console.log(url);
    })
  }

  encrypt = async (event) => {
    event.preventDefault()
    //get elements from form
    const name = document.getElementById('name').value
    const password = document.getElementById('password').value
    const superSecretKey = document.getElementById('privateKey').value

    //create data from elements
    const data = JSON.stringify(this.state.passwordList)
    const data2 = this.state.passwordList.toString()

    console.log(data+`+`+data2);
    //create strigified encrypted passwords
    let ciphertext = CryptoJS.AES.encrypt(data, superSecretKey).toString();
    console.log(ciphertext);
    this.setState({encryptedPasswords: ciphertext})
  }

  decrypt = async (e) => {
    e.preventDefault()

    const superSecretKey = document.getElementById('superSecretInput').value
    let ciphertext = document.getElementById('decrypt').value
    console.log(ciphertext);
    console.log(superSecretKey);
    let bytes = CryptoJS.AES.decrypt(ciphertext, superSecretKey);
    console.log(bytes);
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8)
    console.log(decryptedData);

    this.setState({decryptedPasswords: decryptedData})
  }

  addPassword = async(e) => {
    e.preventDefault()

    const name = document.getElementById('name').value
    const password = document.getElementById('password').value

    let passwordList = this.state.passwordList;
    passwordList.push({
      name: name,
      password: password
    })
    console.log(passwordList);
    this.setState({passwordList: passwordList})
  }

  render() {
    return (<div className="App">
      <Encrypt encrypt={this.encrypt}   encryptedPasswords={this.state.encryptedPasswords}
        passwordList={this.state.passwordList}
        addPassword={this.addPassword}
      />
        <br></br>
        <br></br>
      <Decrypt decrypt={this.decrypt}/>
        <br></br>
        <br></br>
      <Passwords dePass={this.state.decryptedPasswords}/>
        <br></br>
        <br></br>
      <QrCode message={this.state.message}
        onSubmit={this.onSubmit}
      />
    </div>
    )
  }
}

export default App;
