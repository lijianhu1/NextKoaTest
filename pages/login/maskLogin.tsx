import React from 'react'
import LoginBasic from '../../components/LoginBasic'

const loginOption = {
  showMask: false,
  loginSuccess: function() {}
}
const Login = () => {
  return (
    <>
      <LoginBasic loginOption={loginOption} />
    </>
  )
}
Login.getInitialProps = async () => {
  return {
    t: 1
  }
}

export default Login
