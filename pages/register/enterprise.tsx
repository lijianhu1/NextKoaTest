import { message } from 'antd'
import Register from '../../components/EnterpriseRegister/Register'
import { RegisterProps } from '../../types/EnterpriseTypes'
import StorageUtils from '../../lib/storageUtils'
import { connect } from 'react-redux'
import { BillcenterSite } from '../../config/constantData'
const EnterpriseRegister = () => {
  let options: RegisterProps = {
    isResetLoginInfo: true,
    isAgency: false,
    loginRouter: '/login/enterprise',
    success: res => {
      message.success('开通成功，3秒后进入企业后台')
      setTimeout(() => {
        StorageUtils.setAuthInfo({
          CurrentUserId: res.User.UserId,
          CurrentUserName: res.User.UserName,
          EnterpriseId: (res.Enterprise && res.Enterprise.Id) || '',
          IsCreater: true,
          IsAdmin: true,
          Token: res.Token
        })
        //进入企业票据中心
        location.replace(BillcenterSite)
      }, 3000)
    },
    fail: errMsg => {
      message.error(errMsg)
    }
  }
  return <Register toRegisterProps={options} />
}

export default connect(state => state)(EnterpriseRegister)
