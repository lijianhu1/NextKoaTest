import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { message } from 'antd'
import Register from '../../components/EnterpriseRegister/Register'
import { RegisterProps } from '../../types/EnterpriseTypes'
import { AgencyCustomListSite, BillcenterSite } from '../../config/constantData'
import { withRouter } from 'next/router'
import enterpriseActions from '../../store/actions/enterpriseAction'
const AgencyRegister = ({ router, createEnterpriseCustomer }) => {
  const { inviteName = '', name = '', id = '' } = router.query
  let isInviteCase = inviteName.length > 0
  let options: RegisterProps = {
    isResetLoginInfo: isInviteCase ? true : false,
    infoTitle: `${isInviteCase ? inviteName : ''}邀请您开通票税宝企业账号`,
    isAgency: false,
    loginRouter: '/enterprise',
    success: data => {
      //财税机构代理开通企业票据中心
      let postData = { EnterpriseId: id }
      if (isInviteCase) {
        //邀请开通
        Object.assign(postData, {
          EnterpriseName: inviteName,
          CustomerEnterpriseId: data.Enterprise.Id
        })
      } else {
        //代理开通
        Object.assign(postData, {
          CustomerEnterpriseName: name
        })
      }
      createEnterpriseCustomer({
        data: postData,
        complete: () => {
          if (isInviteCase) {
            message.success('添加成功')
            window.location.replace(BillcenterSite)
          } else {
            message.success('绑定财税机构成功')
            //开通成功跳回财税机构页面
            window.location.replace(AgencyCustomListSite)
          }
        }
      })
    },
    fail: errMsg => {
      message.error(errMsg)
    }
  }
  if (router.query.name) {
    options.enterpriseName = router.query.name
  }

  return <Register toRegisterProps={options} />
}

export default connect(
  state => state,
  dispatch => bindActionCreators(enterpriseActions, dispatch)
)(withRouter(AgencyRegister))
