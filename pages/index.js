import React, {Component} from 'react';
import {Card, Button, Image} from 'semantic-ui-react'
import { Link } from '../src/routes'
import blockies from 'ethereum-blockies'
// import logo from './logo.svg';
import web3 from '../src/ethereum/web3'
// import Passwords from './components/Passwords'
// import Encrypt from './components/Encrypt'
// import Decrypt from './components/Decrypt'
// import QrCode from './components/QrCode'
// const bcrypt = require('bcryptjs');
// const AES = require("crypto-js/aes");
// const SHA256 = require("crypto-js/sha256");
// const QRCode = require('qrcode')
// const canvas = document.getElementById('canvas')
const CryptoJS = require("crypto-js")

import PasswordBlock from '../src/ethereum/passwordBlock'
import factory from '../src/ethereum/factory.js'
import Layout from '../src/components/Layout'

class App extends Component {

  // state = {
  //   address: '',
  //   message: 'Click a button to get started',
  //   encryptedPasswords: 'encrypted',
  //   decryptedPasswords: [],
  //   qrCode: '',
  //   passwordList: []
  // }

  state = {
    address: '',
    cards: []
  }

  populate = async () => {
    const address = await web3.eth.getAccounts()
    console.log(address[0]);
    this.setState({address: address[0]})
    //   console.log(address[0]);
    //   return address[0]
  }

  // componentDidMount(){
  //   this.populate()
  //   // console.log(this.populate());
  //   this.setState({address: this.populate})
  // }

  //next.js thing --static helps w/ rendering?
  //getInitialProps instead of state?
  static async getInitialProps() {

    const passwordBlocks = await factory.methods.getDeployedPasswordBlocks().call()

    const addresses = await web3.eth.getAccounts()

    console.log("Manager: "+ passwordBlocks.manager);

    console.log("Current MM address: "+ addresses[0]);
    const address = addresses[0]
    // this.setState({address: address[0]})
    // const passBlocks = await Promise.all(
    //   Array(parseInt(passwordBlocks.length)).fill().map((element) => {
    //     console.log(passwordBlocks.methods);
    //     return passwordBlocks.methods
    //   })
    // )
    // //returns object as props
    return {passwordBlocks, address}
  }


  //// updates eth address and adds qr code
  // onSubmit = async (event) => {
  //   event.preventDefault()
  //   const accounts = await web3.eth.getAccounts();
  //   const chain = web3.eth.net.getId()
  //   .then(console.log);
  //   if (!accounts[0]) {
  //     this.setState({message: 'Please open metamask'})
  //   } else {
  //     this.setState({message: `Your ethereum address is ${accounts[0]}`})
  //   }
  //   QRCode.toCanvas(document.getElementById('canvas'), accounts[0], function (error, url) {
  //     console.log(url);
  //   })
  // }
  //
  // encrypt = async (event) => {
  //   event.preventDefault()
  //   get elements from form
  //   const name = document.getElementById('name').value
  //   const password = document.getElementById('password').value
  //   const superSecretKey = document.getElementById('privateKey').value
  //
  //   create data from elements
  //   const data = JSON.stringify(this.state.passwordList)
  //   const data2 = this.state.passwordList.toString()
  //   console.log(data+`+`+data2);
  //   create strigified encrypted passwords
  //   let ciphertext = CryptoJS.AES.encrypt(data, superSecretKey).toString();
  //   console.log(ciphertext);
  //   this.setState({encryptedPasswords: ciphertext})
  // }


/////////
//in passwordBlocks/Edit/index.js
///////

  // decrypt = async (e) => {
  //   e.preventDefault()
  //   const superSecretKey = document.getElementById('superSecretInput').value
  //   let ciphertext = document.getElementById('decrypt').value
  //   console.log(ciphertext);
  //   console.log(superSecretKey);
  //   let bytes = CryptoJS.AES.decrypt(ciphertext, superSecretKey);
  //   console.log(bytes);
  //   let decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  //   console.log(decryptedData);
  //
  //   this.setState({decryptedPasswords: decryptedData})
  // }

  //
  // addPassword = async(e) => {
  //   e.preventDefault()
  //
  //   const name = document.getElementById('name').value
  //   const password = document.getElementById('password').value
  //
  //   let passwordList = this.state.passwordList;
  //   passwordList.push({
  //     name: name,
  //     password: password
  //   })
  //   console.log(passwordList);
  //   this.setState({passwordList: passwordList})
  // }

  // async componentDidMount() {
  //   console.log('hi');
  //   console.log(passwordBlocks[0])
  // }

  filterBlocks = async (address) => {

    const passwordBlockManager = await PasswordBlock(address).methods.manager().call()


    const adr = await web3.eth.getAccounts()
    // console.log(adr[0]);

    if(passwordBlockManager === adr[0]){
      return true
    } else {
      return false
    }
  }


  renderPasswordBlocks = async () => {

    const passwordBlocks = await factory.methods.getDeployedPasswordBlocks().call()

    const adr = await web3.eth.getAccounts()

    let style = {
      margin: '10px',
      backgroundColor: 'green',
      // borderRadius:15,
      textAlign: 'center'
    }

    let style2 = {
      margin: '10px',
      textAlign: 'center',
      // borderRadius: '15',
    }

    const items = Promise.all(passwordBlocks.map(async (address) => {

      const passwordBlockManager = await PasswordBlock(address).methods.manager().call()

        return {
          manager: passwordBlockManager,
          header: (
            <Card>
              <Card.Content
                fluid="true"
                style={style} >${address}</Card.Content>
              <Card.Content
                style={style2}>
                <div>
                  <Image
                    src={`https://eth.vanity.show/${address}`}
                    alt={`Identicon of ether address ${address}`}
                  />
                </div>
              </Card.Content>
            </Card>
          ),
          description: (
          <div style={style2}>
            <Link
               route={`/passwordBlocks/${address}`}>
              <a>View Password Block</a>
            </Link>
          </div>
          ),
          //fluid makes the card flow all the way to the right.
          fluid: true,
          style: {overflowWrap: 'break-word',
          borderRadius: 20,
          }
        }
      }
    )
  )

const results = await items

const newResults = []

for (var i = 0; i < results.length; i++) {
  if(results[i].manager === adr[0]) {
    newResults.push(results[i])
  }
}

console.log(newResults);
// if(newResults)

this.setState({cards: newResults})

}

//   renderPasswordBlocks = () => {
//
//     const items = this.props.passwordBlocks.map(address => {
//
//       let style = {
//         margin: '10px',
//         backgroundColor: 'green',
//         // borderRadius:15,
//         textAlign: 'center'
//       }
//
//       let style2 = {
//         margin: '10px',
//         textAlign: 'center',
//         // borderRadius: '15',
//       }
//
//       const x = this.filterBlocks(address)
// console.log(x);
//       // console.log(address);
//       // if((this.filterBlocks(address)) === false){
//       //   style = {
//       //     margin: '10px',
//       //     backgroundColor: 'tomato'
//       //   }
//       // }
//
// console.log(this.filterBlocks(address));
// console.log(style);
//
//       return {
//         header: (
//           <Card>
//             <Card.Content
//               fluid="true"
//               style={style} >${address}</Card.Content>
//             <Card.Content
//               style={style2}>
//               <div>
//                 <Image
//                   src={`https://eth.vanity.show/${address}`}
//                   alt={`Identicon of ether address ${address}`}
//                 />
//               </div>
//             </Card.Content>
//           </Card>
//         ),
//         description: (
//         <div style={style2}>
//           <Link
//              route={`/passwordBlocks/${address}`}>
//             <a>View Password Block</a>
//           </Link>
//         </div>
//         ),
//         //fluid makes the card flow all the way to the right.
//         fluid: true,
//         style: {overflowWrap: 'break-word',
//         borderRadius: 20,
//       }
//       }
//     })
//
//     return <Card.Group itemsPerRow={4} items={items} />
//   }



  render() {
    return (
      <Layout>
        <div>
          <Button onClick={this.renderPasswordBlocks} floated="right" content="Show Blocks" icon="add circle" primary/>
          <h3>Password Blocks
          <Link route="/passwordBlocks/new">
            <a>
              <Button floated="right" content="Create Password Block" icon="add circle" primary/>
            </a>
          </Link>
        </h3>
      </div>
      <br></br>
      <br></br>
      <div>
        <Card.Group itemsPerRow={3}
          items={this.state.cards} />
      </div>
      </Layout>
    )
  }
}

export default App;
