import { useCallback } from 'react'
import { Divider, Button } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userAction from '../../store/actions/userAction'

const OnLine = ({ userInfo, logout, onLineCallback,onLineTitle }) => {
  const logoutBefore = useCallback(e => {
    e.preventDefault()
    logout()
  }, [])

  const enterProduct = useCallback(() => {
    onLineCallback()
  }, [])

  return (
    <>
      <div className="on-line">
        <div className="content">
          <span style={{ color: '#ffffff', fontSize: 20, marginTop: 30 }}>{onLineTitle}</span>
          <Divider style={{ backgroundColor: '#ffffff' }} />
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <span style={{ color: '#ffffff', fontSize: 16 }}>欢迎您</span>
            <span style={{ color: '#fc9607', fontSize: 24, marginTop: 10 }}>
              {userInfo.MobilePhone}
            </span>
          </div>
          <div style={{ width: '100%', textAlign: 'right' }}>
            <Button
              style={{
                marginTop: 30,
                width: '100%',
                backgroundColor: '#3b8cff',
                color: '#ffffff',
                borderColor: '#3b8cff',
                height: 40
              }}
              onClick={enterProduct}>
              进入我的产品中心
            </Button>
            <a
              style={{
                display: 'inline-block',
                color: '#38adff',
                marginTop: 10
              }}
              onClick={logoutBefore}>
              退出登录
            </a>
          </div>
        </div>

        <style jsx>{`
          .on-line {
            width: 316px;
            height: 284px;
            padding: 0 22px;
            background-color: rgba(0, 0, 0, 0.7);
            border-radius: 7px;
            position: relative;
          }
          .content {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}</style>
      </div>
    </>
  )
}

export default connect(
  state => state,
  dispatch => bindActionCreators(userAction, dispatch)
)(OnLine)
