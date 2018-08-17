import React from 'react'
import { Container } from 'semantic-ui-react'
import Head from 'next/head'
import Header from './Header'
import Banner from './Banner'

export default props => {

    let style = {
        backgroundImage: `linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(33,146,209,1) 120%)`,
        fontFamily: `Impact, Charcoal, sans-serif`,
        padding: '20px',
        fontSize: '34pt',
        width: '100%'
      }

  return (
    // <Container >
    <div>
      <div style={style}>
    <Head>
      <link rel="stylesheet"
         href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css">
      </link>
      <link href="http://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.css" rel="stylesheet"/>
    </Head>

    <Banner/>
    </div>
    <div style={{
      width: '80%',
      margin: '30px'
    }}>
      {props.children}
    </div>
  </div>
    // </Container>
  )
}
