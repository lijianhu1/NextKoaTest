import React from 'react'
// import LoginBasic from '../../components/LoginBasic'
// const config = require('../../config/constantData')

// const { EnterpriseFolderSite } = config
// const loginOption = {
//   success: function() {
//     window.location.href = EnterpriseFolderSite
//   }
// }
const Login = () => {
  return <div>{/* <LoginBasic loginOption={loginOption} /> */}</div>
}
Login.getInitialProps = async () => {
  return {
    t: 1
  }
}

export default Login
