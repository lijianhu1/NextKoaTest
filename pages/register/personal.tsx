import AccountComp from '../../components/AccountComp'
import { useCallback } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userActions from '../../store/actions/userAction'
import { message } from 'antd'
import { PersonalSite } from '../../config/constantData'
import StorageUtils from '../../lib/storageUtils'

const headerComp = () => {
  return (
    <span
      style={{
        marginLeft: 16,
        width: '100%',
        display: 'inline-block',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
      }}>
      注册个人账号
    </span>
  )
}

const PersonalRegister = ({ registerPersonalAccount }) => {
  const registerHandler = useCallback(data => {
    registerPersonalAccount({
      data,
      cb: res => {
        message.success('注册成功')
        StorageUtils.setAuthInfo({
          Token: res.Token
        })
        setTimeout(() => {
          location.replace(`${PersonalSite}`)
        }, 300)
      }
    })
  }, [])
  return (
    <AccountComp
      flagType={1}
      handler={registerHandler}
      CustomHeaderComp={headerComp}
      btnText={'注册'}
    />
  )
}

export default connect(
  state => state,
  dispatch => bindActionCreators(userActions, dispatch)
)(PersonalRegister)
