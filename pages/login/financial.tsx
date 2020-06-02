import { message } from 'antd'
import React from 'react'
import NormalSubHeader from '../../components/NormalSubHeader'
import SingleBannerComp from '../../components/SingleBannerComp'
import BannerDesc from '../../components/EnterpriseComp/BannerDesc'
const { EnterpriseFolderSite } = require('../../config/constantData')
import { withRouter } from 'next/router'
import { connect } from 'react-redux'
import userAction from '../../store/actions/userAction'
import { bindActionCreators } from 'redux'
import StorageUtils from '../../lib/storageUtils'

const EnterpriseFolderLogin = ({ router, logout }) => {
  const isPc = router.query && router.query.isPc
  return (
    <div>
      <NormalSubHeader normalSubHeaderProps={{ styleMode: 0 }} />
      <SingleBannerComp
        image={'enterprise/folder/login-banner.png'}
        smHeight={500}
        xsHeight={150}
        customComp={<BannerDesc />}
        onLineTitle={'企业票夹登录'}
        isPc={isPc}
        loginCompOption={{
          showLoginComp: true,
          registerAddr: '/register/financial',
          successCallback: res => {
            if (!res.BindEnterprises.length) {
              message.error('您没有注册过任何企业或您不是管理员')
              logout()
              return false
            } else {
              // Router.push(`/financial`)
              StorageUtils.setAuthInfo({
                CurrentUserId: res.User.UserId,
                CurrentUserName: res.User.UserName,
                Token: res.Token
              })
              setTimeout(() => {
                window.location.replace(
                  `${EnterpriseFolderSite}${isPc ? `?isPc=${router.query.isPc}` : ''}`
                )
              }, 500)
              return true
            }
          }
        }}
      />
    </div>
  )
}

export default connect(
  state => state,
  dispatch => bindActionCreators(userAction, dispatch)
)(withRouter(EnterpriseFolderLogin))
