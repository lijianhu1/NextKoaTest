import { message } from 'antd'
import React, { useCallback } from 'react'
import NormalSubHeader from '../../components/NormalSubHeader'
import SingleBannerComp from '../../components/SingleBannerComp'
import BannerDesc from '../../components/EnterpriseComp/BannerDesc'
const { BillcenterSite } = require('../../config/constantData')
import { connect } from 'react-redux'
import userAction from '../../store/actions/userAction'
import { bindActionCreators } from 'redux'
// import Router from 'next/router'
import StorageUtils from '../../lib/storageUtils'
const EnterpriseFolderLogin = ({ logout }) => {
  const jumpBefore = useCallback(info => {
    let firstEnterprise = info.BindEnterprises[0]
    let CurrentUserId = info.User.UserId,
      CurrentUserName = firstEnterprise.CurrentUserName,
      Token = info.Token
    StorageUtils.setAuthInfo({
      CurrentUserId,
      CurrentUserName,
      Token
    })
    setTimeout(() => {
      location.replace(`${BillcenterSite}`)
    }, 300)
  }, [])
  return (
    <div>
      <NormalSubHeader normalSubHeaderProps={{ styleMode: 0 }} />
      <SingleBannerComp
        image={'enterprise/folder/login-banner.png'}
        smHeight={500}
        xsHeight={150}
        customComp={<BannerDesc isFolder={false} />}
        onLineTitle={'电子报销登录'}
        loginCompOption={{
          showLoginComp: true,
          registerAddr: '/register/enterprise',
          successCallback: res => {
            if (!res.BindEnterprises.length) {
              message.error('您没有注册过任何企业或您不是管理员')
              logout()
              return false
            } else {
              // Router.push(`/enterprise`)
              jumpBefore(res)
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
)(EnterpriseFolderLogin)
