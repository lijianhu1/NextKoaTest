import { useEffect, useState, useCallback } from 'react'
import { Row, Col, Divider } from 'antd'
import { Menu } from 'antd'
import './index.less'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userAction from '../../store/actions/userAction'
import Router from 'next/router'

const { SubMenu } = Menu
// import getConfig from 'next/config'
// const { publicRuntimeConfig } = getConfig()
const menuConfig = [
  { key: 'personal', title: '个人' },
  {
    key: '',
    title: '企业',
    subMenu: [{ key: 'financial', title: '企业票夹' }, { key: 'enterprise', title: '电子报销' }]
  },
  { key: 'agencyGov', title: '财税机构' },
  { key: 'openPlatform', title: '开放平台' },
  { key: 'invoiceCollect', title: '票据收集' },
  { key: 'partner', title: '合作伙伴' }
]
//配置什么页面显示右边的登录信息
const showLoginInfoWhiteList = ['/personal']

const NormalHeader = ({ userInfo, logout }) => {
  const [selectedKeys, setSelectedKeys] = useState([])
  const [showLoginInfo, setShowLoginInfo] = useState(false)
  const [routePath, setRoutePath] = useState('/')

  const routeChangeComplete = useCallback((...args) => {
    setRoutePath(args[0])
  }, [])

  useEffect(() => {
    setShowLoginInRight(routePath)
  }, [routePath])

  useEffect(() => {
    Router.events.on('routeChangeComplete', routeChangeComplete)
    setShowLoginInRight(Router.pathname)
    let res = menuConfig.find(item => item.key && location.href.indexOf(item.key) > -1)
    if (res) {
      setSelectedKeys([res.key])
    } else {
      let menuItems = []
      let subMenus = menuConfig.filter(item => !item.key).map(menu => menu.subMenu)
      subMenus.forEach(item => (menuItems = [...menuItems, ...item]))
      let subMenuItem = menuItems.find(item => location.href.indexOf(item.key) > -1)
      if (subMenuItem) {
        setSelectedKeys([subMenuItem.key])
      }
    }
  }, [])

  const setShowLoginInRight = useCallback(routePath => {
    let flag = showLoginInfoWhiteList.indexOf(routePath) > -1
    setShowLoginInfo(flag)
  }, [])

  const MenuItemClick = useCallback(e => {
    console.log(e.key)
    Router.push(`/${e.key}`)
    setSelectedKeys([e.key])
  }, [])

  const logoutPsb = useCallback(e => {
    e.preventDefault()
    logout()
  }, [])

  return (
    <Row className="normal-header-style">
      <Col
        xs={{ span: showLoginInfo ? 13 : 23, offset: 1 }}
        sm={{ span: showLoginInfo ? 15 : 22, offset: 2 }}
        md={{ span: showLoginInfo ? 15 : 21, offset: 3 }}
        xxl={{ span: showLoginInfo ? 16 : 20, offset: 4 }}>
        <Menu
          mode="horizontal"
          style={{
            backgroundColor: '#1e1b29',
            color: '#ffffff',
            height: '25px',
            lineHeight: '25px'
          }}
          selectedKeys={selectedKeys}
          onClick={MenuItemClick}>
          {menuConfig.map(item => {
            return item.key ? (
              <Menu.Item key={item.key}>{item.title}</Menu.Item>
            ) : (
              <SubMenu key={item.title} title={item.title}>
                {item.subMenu.map(sub => {
                  return <Menu.Item key={sub.key}>{sub.title}</Menu.Item>
                })}
              </SubMenu>
            )
          })}
        </Menu>
      </Col>
      <Col xs={{ span: 10 }} sm={{ span: 7 }} md={{ span: 6 }} xxl={{ span: 3 }}>
        {showLoginInfo && userInfo.UserId ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginRight: 20
            }}>
            <span style={{ color: '#ffffff' }}>您好</span>
            <Divider type="vertical" />
            <span style={{ color: '#ffffff' }}>{userInfo.MobilePhone}</span>
            <Divider type="vertical" />
            <a style={{ color: '#ffffff' }} onClick={logoutPsb}>
              退出
            </a>
          </div>
        ) : null}
      </Col>
    </Row>
  )
}

export default connect(
  state => state,
  dispatch => bindActionCreators(userAction, dispatch)
)(NormalHeader)
