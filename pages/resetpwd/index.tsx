import { Icon, message } from 'antd'
import AccountComp from '../../components/AccountComp'
import { useCallback } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import userAction from '../../store/actions/userAction'
import { withRouter } from 'next/router'

const headerComp = () => {
  return (
    <>
      <Icon type="exclamation-circle" theme="filled" style={{ color: '#00b5fc', fontSize: 18 }} />
      <span style={{ marginLeft: 16 }}>请输入您需要重置的新密码</span>
    </>
  )
}

const ResetPwd = ({ router, resetPassword }) => {
  const isPc = router.query && router.query.isPc || false
  const resetPwdHandler = useCallback(data => {
    resetPassword({
      data,
      success: () => {
        message.success('重置成功')
        window.history.back()
      },
      fail: errMsg => {
        message.error(errMsg)
      }
    })
  }, [])

  return (
    <AccountComp
      flagType={2}
      handler={resetPwdHandler}
      CustomHeaderComp={headerComp}
      btnText={'重置密码'}
      isPc={isPc}
    />
  )
}

export default connect(
  state => state,
  dispatch => bindActionCreators(userAction, dispatch)
)(withRouter(ResetPwd))
