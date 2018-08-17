import React, {Component} from 'react'
import {Form, Button, Input, Message, Card} from 'semantic-ui-react'
import Layout from '../../../src/components/Layout'
import factory from '../../../src/ethereum/factory'
import web3 from '../../../src/ethereum/web3'
import {Link, Router} from '../../../src/routes'
import PasswordBlock from '../../../src/ethereum/passwordBlock'
const CryptoJS = require("crypto-js")
const toastr = require('toastr')

class EditPassword extends Component {
  state = {
    description: '',
    loading: false,
    errorMessage: '',
    seed: '',
    encryptedPasswords: '',
    passwordList: [],
    passwordCount: 1,
  }

  static async getInitialProps(props){
    const {address} = props.query
    const passwordBlock = PasswordBlock(address)
    // console.log(passwordBlock);
    const blockCount = await passwordBlock.methods.getBlockCount().call()
    // console.log(blockCount+"!!!");
    const blocks = await Promise.all(
      Array(parseInt(blockCount)).fill().map((element, index) => {
        return passwordBlock.methods.encryptedBlock(index).call()
      })
    )
    const thisBlock = blocks[props.query.id]
    const id = props.query.id

    return { address, thisBlock, id, passwordBlock}
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

  onSubmit = async (event) => {
    event.preventDefault()

    let descriptions = []
    let passwords = []
    let toBeEncrypted = []

    for (var i = 0; i < this.state.passwordCount - 1; i++) {
      descriptions[i] = document.getElementById(`Desc${i}`).value
      passwords[i] = document.getElementById(`Pass${i}`).value
      console.log(descriptions[i]);
      toBeEncrypted[i] = [`${descriptions[i]}: ${passwords[i]}`]
    }

    if(this.state.passwordCount == 1){
      toBeEncrypted[0] = [`${document.getElementById(`Desc0`).value}: ${document.getElementById(`Pass0`).value}`]
    }
    this.encrypt(toBeEncrypted)
  }



  encrypt = async (arr) => {
    // get elements from form
    const superSecretKey = this.state.seed
    // create data from elements
    const passwordBlock = PasswordBlock(this.props.address)
    const { encryptedPasswords } = this.state
    const data = JSON.stringify(arr)

    console.log(arr);

    let ciphertext = CryptoJS.AES.encrypt(data, superSecretKey).toString();

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
      "timeOut": "33000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "show",
      "hideMethod": "fadeOut"
    }

    let description = document.getElementById('Label').value
    console.log(description);
    this.setState({encryptedPasswords: ciphertext, loading: true, errorMessage: ''})

    try {
        const accounts = await web3.eth.getAccounts()
        console.log(this.state.encryptedPasswords);

        toastr.info("Your transaction will be mined.", "Please Click Submit")
        await passwordBlock.methods.newPasswordBlock(
          description, this.state.encryptedPasswords
        ).send({from: accounts[0]})
        Router.pushRoute(`/passwordBlocks/${this.props.address}/`)
      } catch (err) {
        toastr.clear()
        this.setState({errorMessage: err.message})
      }
      toastr.clear()
     this.setState({loading: false})

  }



  render(){
    return (
      <Layout>
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
                <Form.Field>
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
          </Layout>
        )
  }
}

export default EditPassword
