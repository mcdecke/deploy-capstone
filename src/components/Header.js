import React, {Component} from 'react'
import {Menu, Message} from 'semantic-ui-react'
import {Link} from '../routes'
import web3 from '../ethereum/web3'

class Header extends Component {

// state = {
//   address: ''
// }
//
// populate = async () => {
//   const address = await web3.eth.getAccounts()
//   this.setState({address: address[0]})
//     console.log(address[0]);
//     return address[0]
// }
//
// componentDidMount(){
//   this.populate()
//   // console.log(this.populate());
//   this.setState({address: this.populate})
// }

render(){
    return (
      <Menu style={{marginTop: '10px'}}>
        <Link route="/">
          <a className="item">Home</a>
        </Link>
          {/* Your Address: {this.state.address} */}
        <Menu.Menu position="right">
          <Link route="/passwordBlocks/new">
            <a className="item">Add Block</a>
          </Link>
{/*
          <Link route="/passwordBlocks/new">
            <a className="item">+</a>
          </Link> */}
        </Menu.Menu>
      </Menu>
    )
  }
}

export default Header
