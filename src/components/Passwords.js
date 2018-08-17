import React, {Component} from 'react'
import '../index.css';
import '../App.css';
import Password from './Password'
import App from '../App'

class Passwords extends Component {

render() {
    return (
      <div>
        {/* {this.props.dePass.map((x, i) => {
          console.log(x);
          return(
            <Password
              name={x.name}
              password={x.password}
              key={i}
            />
          )
        })} */}
        {this.props.dePass}
    </div>
    )
  }

}

export default Passwords
