import { message } from 'antd'
import Register from '../../components/EnterpriseRegister/Register'
import { RegisterProps } from '../../types/EnterpriseTypes'
import { EnterpriseFolderSite } from '../../config/constantData'
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import StorageUtils from '../../lib/storageUtils'
//企业票夹注册
const FinancialRegister = ({ router }) => {
  let options: RegisterProps = {
    isResetLoginInfo: true,
    isAgency: false,
    loginRouter: '/login/financial',
    success: res => {
      message.success('开通成功，3秒后进入后台')
      setTimeout(() => {
        //开通成功
        StorageUtils.setAuthInfo({
          CurrentUserId: res.User.UserId,
          CurrentUserName: res.User.UserName,
          EnterpriseId: (res.Enterprise && res.Enterprise.Id) || '',
          IsCreater: true,
          IsAdmin: true,
          Token: res.Token
        })
        //这里有可能是在企业票夹，也有可能是在企业票夹客户端
        let isPc = router.query.isPc
        let site = EnterpriseFolderSite
        if (isPc) {
          site = site.replace(/web/gi, `web${Math.floor(Math.random() * 10)}`)
          site += `?isPc=${isPc}`
        }
        location.replace(site)
      }, 3000)
    },
    fail: errMsg => {
      message.error(errMsg)
    }
  }
  return <Register toRegisterProps={options} />
}

export default connect(state => state)(withRouter(FinancialRegister))
