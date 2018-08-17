import React, {Component} from 'react'
import { Card, Grid, Button, Table } from 'semantic-ui-react'
import Layout from '../../src/components/Layout'
import PasswordBlock from '../../src/ethereum/passwordBlock'
import EditForm from '../../src/components/EditForm'
import { Link } from '../../src/routes'
import RenderRow from '../../src/components/RenderRow'
const toastr = require('toastr')

class ShowPassBlock extends Component {

  static async getInitialProps(props) {
    const {address} = await props.query
    const block = await PasswordBlock(address)
    const manager = await block.methods.manager().call();
    const passwordBlock = await PasswordBlock(address)
    const blockCount = await passwordBlock.methods.getBlockCount().call()

    const blocks = await Promise.all(
      Array(parseInt(blockCount)).fill().map((element, index) => {
        return passwordBlock.methods.encryptedBlock(index).call()
      })
    )

    return {
      address: address,
      manager: manager,
      blocks: blocks
    }
  }


  renderRow() {

  toastr.clear()

    return this.props.blocks.map((block, index) => {
      console.log(block);
      return <RenderRow
        block={block}
        key={index}
        id={index}
        address={this.props.address}
      />
    })
  }

  render() {
    const { Header, Row, HeaderCell, Body} = Table;

    return (
      <Layout>
        <h3>Show Block</h3>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Data</HeaderCell>
              <HeaderCell>Edit</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRow()}</Body>
        </Table>

        <Link route={`/passwordBlocks/${this.props.address}/new`}>
          <a>
            <Button floated="right" content="Add New Password Block" icon="add circle" primary/>
          </a>
        </Link>

      </Layout>
    )
  }
}

export default ShowPassBlock





// renderBlocks() {
//
//   const {
//     address,
//     manager,
//     blocks
//   } = this.props
//
//   console.log(blocks);
//   console.log(manager);
//   console.log(address);
//

//   const items = [
//     {
//     header: 'Address of Owner',
//     meta: "The owner created and can edit this password block.",
//     description: manager,
//     style: {overflowWrap: 'break-word'}
//   },
//   {
//     header: 'Description',
//     meta: 'What these passwords are',
//     description: description,
//     style: {overflowWrap: 'break-word'}
//   },
//   {
//     header: 'Encrypted Data',
//     meta: 'Redundant Meta Data',
//     description: encrypted,
//     style: {overflowWrap: 'break-word'}
//   }
// ]
  // console.log(items);
  // return <Card.Group items={items}/>
// }

/*
  <Grid>
    <Grid.Row>
      <Grid.Column width={10}>
        {this.renderBlocks()}
      </Grid.Column>


      <Grid.Column width={6}>
        <EditForm address={this.props.address} />
      </Grid.Column>
    </Grid.Row>

    <Grid.Row>
      <Grid.Column>
        <Link route={`/passwordBlocks/${this.props.address}/edit`}>
          <a>
            <Button primary>Edit Block</Button>
          </a>
        </Link>
      </Grid.Column>
    </Grid.Row>
  </Grid>
*/
