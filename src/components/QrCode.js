import React, {Component} from 'react'
import '../index.css';
import '../App.css';
import Password from './Password'
import App from '../App'

class QrCode extends Component {

render() {
    return (
      <div>
        <div className='hidden'>
          Hello {this.props.message}
          <br></br>
          <canvas id='canvas'></canvas>
          <script src="bundle.js"></script>
        </div>
        <br></br>
        <button onClick={this.props.onSubmit}>Update eth address</button>
      </div>
    )
  }
}

export default QrCode
