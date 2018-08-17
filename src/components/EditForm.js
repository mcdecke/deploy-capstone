import React, { Component } from 'react'
import { Form, Input, Message, Button } from 'semantic-ui-react'
import PasswordBlock from '../ethereum/passwordBlock'
import web3 from '../ethereum/web3'
import {Link, Router} from '../routes'

class EditForm extends Component {

  state = {
    value: '',
    errorMessage: '',
    loading: false
  }

  onSubmit = async (event, value)=> {
    event.preventDefault()

    const passwordBlock = PasswordBlock(this.props.address)
    //
    // console.log(passwordBlock.methods);
    // console.log(this.state.value);

    this.setState({loading: true, errorMessage: ''})

    try {
      const accounts = await web3.eth.getAccounts()
      await passwordBlock.methods.createBlock('Description!!!', this.state.value).send({
        from: accounts[0]
      })

      Router.replaceRoute(`/passwordBlocks/${this.props.address}`)
    } catch (err) {
      this.setState({errorMessage: err.message})
    }

    this.setState({loading: false, value: ''})

  }

  render(){
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Data to be saved</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({value: event.target.value})}
            label="encryptedBlock"
            labelPosition="right" />
        </Form.Field>

        <Message error header="Error!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Submit!
        </Button>
      </Form>
    )
  }
}

export default EditForm
