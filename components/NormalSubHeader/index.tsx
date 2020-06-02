// import { useCallback } from 'react'
import { Row, Col, Menu, Button } from 'antd'
import './index.less'
import Link from 'next/link'
import { withRouter } from 'next/router'
import { NormalSubHeaderProps, NormalSubHeaderLoginProps } from '../../types/NormalSubHeader'
import { connect } from 'react-redux'
import getConfig from 'next/config'
import { NoShowTopHeaderWhiteList } from '../../config/constantData'
const { publicRuntimeConfig } = getConfig()

interface Props {
  normalSubHeaderProps: NormalSubHeaderProps
  normalSubHeaderLoginProps?: NormalSubHeaderLoginProps
}

const LogoImg = () => {
  return <img className="header_logo" src="/static/images/header_logo.png" />
}

const LogoCol = ({ isPc = false }) => {
  return (
    <Col
      xs={{ span: 8 }}
      sm={{ span: 4, offset: 2 }}
      md={{ span: 4, offset: 3 }}
      lg={{ span: 2, offset: 3 }}
      xl={{ span: 2, offset: 3 }}
      xxl={{ span: 2, offset: 4 }}>
      {isPc ? (
        <LogoImg />
      ) : (
        <Link prefetch href="/">
          <a>
            <LogoImg />
          </a>
        </Link>
      )}
    </Col>
  )
}

let registerCol = ({
  authInfo,
  normalSubHeaderProps,
  normalSubHeaderLoginProps = {
    loginStyle: 0,
    showLoginBtn: false,
    loginSuccessTitle: '',
    enterBackgroundMgrBefore: () => {}
  }
}: Props & { authInfo?: any }) => {
  const { styleMode, loginRouter, registerRouter } = normalSubHeaderProps
  const {
    loginStyle,
    showLoginBtn,
    loginSuccessTitle,
    enterBackgroundMgrBefore
  } = normalSubHeaderLoginProps

  // const login = useCallback(() => {
  //   if (loginRouter.startsWith('http')) {
  //     // console.log(Router.back)
  //     window.location.href = loginRouter
  //   } else {
  //     Router.push({
  //       pathname: loginRouter
  //     })
  //   }
  // }, [loginRouter])

  return (
    <>
      {showLoginBtn ? (
        loginStyle > 0 ? (
          <Col xs={{ offset: 3 }} sm={{ offset: 9 }} md={{ offset: 10 }} lg={{ offset: 13 }}>
            {/* <span>
              我已注册,现在就
              <Button
                style={{
                  marginLeft: 10,
                  backgroundColor: '#4bbcff',
                  color: '#ffffff'
                }}
                onClick={login}>
                登录
              </Button>
            </span> */}
          </Col>
        ) : (
          <Col
            xs={{ span: 8, offset: 1 }}
            sm={{ span: 7, offset: 2 }}
            md={{ span: 6, offset: 2 }}
            lg={{ span: 4, offset: styleMode === 2 ? 1 : 4 }}
            xl={{ span: 4, offset: styleMode === 2 ? 2 : 5 }}
            xxl={{ span: 4, offset: styleMode === 2 ? 2 : 4 }}>
            <div className="login-btn">
              {authInfo.token ? (
                <Button
                  type="primary"
                  style={{ backgroundColor: '#3b8cff', color: '#ffffff' }}
                  onClick={enterBackgroundMgrBefore}>
                  {loginSuccessTitle}
                </Button>
              ) : (
                <>
                  <Link href={loginRouter}>
                    <a>登录</a>
                  </Link>
                  <Link href={registerRouter}>
                    <a>注册</a>
                  </Link>
                </>
              )}
            </div>
          </Col>
        )
      ) : null}
    </>
  )
}

const LoginRegisterCol = connect(state => state)(registerCol)

const NormalSubHeaderContentCol = ({ normalSubHeaderProps }: Props) => {
  const { styleMode, activePath, menuItems, backgroundColor } = normalSubHeaderProps
  return (
    <>
      {styleMode > 0 ? (
        <Col
          xs={{ span: 6, offset: 1 }}
          sm={{ span: 7, offset: 2 }}
          md={{ span: 7, offset: 1 }}
          lg={{
            span: styleMode === 2 ? 10 : 6,
            offset: styleMode === 2 ? 2 : 4
          }}
          xl={{ span: styleMode === 2 ? 9 : 6, offset: 3 }}
          xxl={{ span: styleMode === 2 ? 8 : 6, offset: 4 }}>
          <Menu
            className="content-opt"
            mode="horizontal"
            theme="dark"
            style={{
              backgroundColor: backgroundColor || '#fbfafa',
              lineHeight: '70px'
            }}>
            {menuItems.map(item => {
              console.log(item);
              
              return (
                <Menu.Item key={item.name} style={{ backgroundColor: backgroundColor }}>
                  <Link
                    prefetch
                    href={
                      item.path === '/'
                        ? item.path:
                        item.path.indexOf('http')>-1?item.path: `${publicRuntimeConfig.preFixPath}${item.path}`
                    }>
                    <a
                     target={item.path.indexOf('http')>-1?'_blank':''}
                      onMouseEnter={item.mouseEnterEvent}
                      onMouseLeave={item.mouseLeaveEvent}
                      style={
                        activePath === item.path ? { color: '#3b8bfd' } : { color: '#333333' }
                      }>
                      {item.name}
                    </a>
                  </Link>
                </Menu.Item>
              )
            })}
          </Menu>
        </Col>
      ) : null}
      <style jsx>{`
        .ant-menu-item-selected {
          background-color: #fbfafa !important;
        }
      `}</style>
      <style jsx global>
        {`
          .ant-menu-dark .ant-menu-sub {
            background-color: #ffffff !important;
          }
        `}
      </style>
    </>
  )
}

const NormalSubHeader = ({
  router,
  normalSubHeaderProps,
  normalSubHeaderLoginProps
}: Props & { router: any }) => {
  const { backgroundColor = '#fbfafa' } = normalSubHeaderProps
  const isPc = router.query.isPc && router.query.isPc.length > 0
  const hasTopHeader = NoShowTopHeaderWhiteList.indexOf(router.pathname) === -1 && !isPc
  return (
    <Row
      type="flex"
      align="middle"
      style={{ top: hasTopHeader ? 25 : 0, backgroundColor: backgroundColor }}
      className="normal-sub-header">
      <LogoCol isPc={isPc} />
      <NormalSubHeaderContentCol normalSubHeaderProps={normalSubHeaderProps} />
      <LoginRegisterCol
        normalSubHeaderProps={normalSubHeaderProps}
        normalSubHeaderLoginProps={normalSubHeaderLoginProps}
      />
    </Row>
  )
}

export default withRouter(NormalSubHeader)
