import { message } from 'antd'
import Register from '../../components/EnterpriseRegister/Register'
import { RegisterProps } from '../../types/EnterpriseTypes'
import Router from 'next/router'
const AgencyRegister = () => {
  let options: RegisterProps = {
    isResetLoginInfo: true,
    isAgency: true,
    loginRouter: '/agencyGov',
    success: () => {
      Router.push({
        pathname: '/register/agencyRegSuccess'
      })
    },
    fail: errMsg => {
      message.error(errMsg)
    }
  }
  return <Register toRegisterProps={options} />
}

export default AgencyRegister
