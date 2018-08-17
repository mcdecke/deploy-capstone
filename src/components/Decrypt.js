import React, {Component} from 'react'
import '../index.css';
import '../App.css';
import App from '../App'

class Encrypt extends Component {

render() {
  return (
    <div>
      <input id="decrypt" type="text" name="Decryptor" defaultValue="Enter encrypted block"></input>
      <br></br>
      <input id="superSecretInput" type="text" name="Decryptor" defaultValue="Enter Seed"></input>
      <br></br>
      <button onClick={this.props.decrypt}>Decrypt Passwords </button>
      </div>
    )
  }
}

export default Encrypt
