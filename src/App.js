import React, { useEffect } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import { Container, CircularProgress } from '@material-ui/core'
import Assets from './components/Assets/Assets'
import { Typography } from '@material-ui/core'

function App(props) {
  useEffect(() => {
    props.initializeApp()
  })
  if (props.inititialized) {
    return (
      <div className='App'>
        <Container maxWidth='lg' style={{ overflowX: 'hidden' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Активы предприятия «Предприятие»
          </Typography>
          <Assets />
        </Container>
      </div >
    )
  }
  return (
    <Container maxWidth='lg' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CircularProgress color='primary' />
    </Container>
  )
}
let mstp = (state) => {
  return {
    inititialized: state.appReducer.inititialized
  }
}
export default connect(mstp, {
  initializeApp
})(App)
