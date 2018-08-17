import React, {Component} from 'react'
import {Table, Button, Input, Form} from 'semantic-ui-react'
import EditForm from './EditForm'
const CryptoJS = require("crypto-js")
import {Link, Router} from '../routes'

class RenderRow extends Component {

  state = {
    seed: '',
    decryptedPasswords: ''
  }

  render(){
    const {Row, Cell} = Table
    const {id, address, block} = this.props

    let styles = {
      margin: '20px',
      float: 'right',
      border: '30px',
      width: '200px'
  }

  let cellStyle = {
    wordBreak:'break-all'
  }

    return(
      <Row style={cellStyle} >
        <Cell>{id}</Cell>
        <Cell>{block.description}</Cell>
        <Cell>{block.encrypted}</Cell>

        <Cell>
            <Link
              route={`/passwordBlocks/${address}/${id}/edit`}>
              <a>
                <Button primary style={styles}>Edit Block</Button>
              </a>
            </Link>
        </Cell>
        <div style={cellStyle}>
          {this.state.decryptedPasswords}
        </div>
      </Row>
    )
  }
}

export default RenderRow
