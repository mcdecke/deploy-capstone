import React, {Component} from 'react'
import {Form, Button, Input, Message, Card} from 'semantic-ui-react'
import Layout from '../../src/components/Layout'
import factory from '../../src/ethereum/factory'
import web3 from '../../src/ethereum/web3'
import {Link, Router} from '../../src/routes'
const CryptoJS = require("crypto-js")
const toastr = require('toastr')

class NewPassBlock extends Component {

  state = {
    description: '',
    errorMessage: '',
    loading: false,
    passwordCount: 1,
    passwordList: [],
    encryptedPasswords: '',
    seed: ''
  }

  onAddPassword = (e) => {
    e.preventDefault()

    this.setState({
      passwordCount: this.state.passwordCount + 1
    })

    for (var i = 0; i < this.state.passwordCount - 1; i++) {
      console.log(this.state.passwordCount);
      this.state.passwordList[i + 1] = (
      <div>
      <Card fluid="true">
        <Card.Content>
          <Form.Field>
            <label>Add a Description</label>
            <Input id={`Desc${i+1}`} label="Description" labelPosition="right"/>
          </Form.Field>
        </Card.Content>
        <Card.Content>
          <Form.Field>
            <label>Add Password</label>
            <Input id={`Pass${i+1}`} label="Password" labelPosition="right"/>
          </Form.Field>
        </Card.Content>
      </Card>
    <br></br>
    </div>

    )
    }
  }


  encrypt = async (arr) => {
    event.preventDefault()
    console.log(arr);
    // get seed from form
    //create data from elements
    const data = JSON.stringify(arr)
    console.log(data);
    //create strigified encrypted passwords
    let ciphertext = CryptoJS.AES.encrypt(data, this.state.seed).toString();

    toastr.options = {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": true,
      "positionClass": "toast-bottom-center",
      "preventDuplicates": true,
      "onclick": null,
      "showDuration": "700",
      "hideDuration": "30000",
      "timeOut": "45000",
      // "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "show",
      "hideMethod": "fadeOut"
    }

    toastr.info("Your transaction is being mined.", "Please Wait")

    // this.setState({encryptedPasswords: ciphertext})
    this.setState({loading: true, errorMessage: ''})

    try {
      const accounts = await web3.eth.getAccounts()

      const addr = await factory.methods.createPasswordBlock(document.getElementById('Label').value, ciphertext).send({from: accounts[0]})
      console.log(addr);
      Router.pushRoute(`/`)
    } catch (err) {
      toastr.clear()
      this.setState({errorMessage: err.message})
    }
    this.setState({loading: false})
  }

  onSubmit = async (event) => {

    event.preventDefault()

    let descriptions = []
    let passwords = []
    let toBeEncrypted = []

    for (var i = 0; i < this.state.passwordCount - 1; i++) {
      descriptions[i] = document.getElementById(`Desc${i}`).value
      passwords[i] = document.getElementById(`Pass${i}`).value
      toBeEncrypted[i] = [`${descriptions[i]}: ${passwords[i]}`]
    }

    if(this.state.passwordCount === 1){
      toBeEncrypted[0] = [document.getElementById(`Desc0`).value+`:`+ document.getElementById(`Pass0`).value]
    }
    this.encrypt(toBeEncrypted)
  }

  render() {

    return (<Layout>
      <h3>Create a New Password Block</h3>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}
      className='FORM'
        >

      <div>
        <Form.Field>
          <label>Password Block Name</label>
          <Input id='Label' label="Block Name" labelPosition="right"/>
        </Form.Field>

        <Card fluid="true">
          <Card.Content>
            <Form.Field >
              <label>Add a Description</label>
              <Input id='Desc0' label="Description" labelPosition="right"/>
            </Form.Field>
          </Card.Content>
          <Card.Content>
            <Form.Field>
              <label>Add Password</label>
              <Input id='Pass0' label="Password" labelPosition="right"/>
            </Form.Field>
          </Card.Content>
        </Card>
      <br></br>
      </div>

        <div >
          {this.state.passwordList}
        </div>

        <Button primary="primary" onClick={((e) => this.onAddPassword(e))}>Add Another Password!</Button>

        <Message error="error" header="Oops!" content={this.state.errorMessage}/>
        <br></br>
        <br></br>
        <Form.Field>
          <label>Seed</label>
          <Input
            value={this.state.seed}
            onChange={event => {
              this.setState({seed: event.target.value})
            }
          }
          />
        </Form.Field>
        <br></br>
        <br></br>
        <Button loading={this.state.loading} primary="primary">Encrypt Passwords!</Button>
      </Form>
    </Layout>)
  }
}

export default NewPassBlock
