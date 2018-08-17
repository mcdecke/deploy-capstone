import React, {Component} from 'react'
import '../index.css';
import '../App.css';
import App from '../App'

class Encrypt extends Component {

render() {
    return (
      <div>
        <br></br>
        <br></br>
        <form>
          Name:
          <input id="name" type="text" name="Name" defaultValue="Name"></input>
          <br></br>
          <br></br>
          Password:
          <input id="password" type="text" name="Password to store" defaultValue="Password"></input>
          <br></br>
          <br></br>
          <input id="privateKey" type="text" name="privateKey" defaultValue="Private Key"></input>
          <br></br>
          <br></br>
          <input type="submit" value="Add Password" onClick={this.props.addPassword}></input>
          {this.props.passwordList}
        </form>
        <br></br>
        <br></br>
        <input type="submit" value="Encrypt Passwords" onClick={this.props.encrypt}></input>
        <br></br>
        <br></br>
        <div id='encryptedPasswords'>Encrypted Passwords:
          <br></br>
          {this.props.encryptedPasswords}
        </div>
      </div>
    )
  }
}

export default Encrypt
