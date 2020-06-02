import './desc.less'
import { useState, useEffect, useCallback } from 'react'
import NormalSubHeader from '../../components/NormalSubHeader'
import {
  NormalSubHeaderProps,
  NormalSubHeaderLoginProps
} from '../../types/NormalSubHeader'
import { Layout, Row, Col, Menu } from 'antd'
const { Content, Sider } = Layout
import AgencyConfig from '../../constant/AgencyConfig'
import UserConnect from '../../components/AgencyDesc/UserConnect'
import Business from '../../components/AgencyDesc/Business'
import Tools from '../../components/AgencyDesc/Tools'
import OpenData from '../../components/AgencyDesc/OpenData'
const MenuItems = AgencyConfig.serviceConfig.map(item => item.title)
type SelectMenuItem = {
  id: number
  title: string
}
let initialData: SelectMenuItem = { id: 0, title: '' }
const Agency = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(initialData)
  const [showSider, setShowSider] = useState(true)
  useEffect(() => {
    let res = location.href.split('?')
    let queryParams = res[1]
    if (queryParams) {
      let index = Number(queryParams.split('=')[1])
      let menuItem = AgencyConfig.serviceConfig.find(item => item.id === index)
      setSelectedMenuItem(menuItem)
    }
  }, [])

  useEffect(() => {
    let documentWidth = document.documentElement.clientWidth
    if (documentWidth < 576) {
      setShowSider(false)
    } else {
      setShowSider(true)
    }
  }, [])

  const menuItemClick = useCallback(e => {
    let item = AgencyConfig.serviceConfig.find(item => item.title === e.key)
    setSelectedMenuItem(item)
  }, [])

  const normalSubHeader: NormalSubHeaderProps = {
    styleMode: 0,
    activePath: 'agencyGov'
  }
  const normalLoginParam: NormalSubHeaderLoginProps = {
    loginStyle: 1,
    showLoginBtn: true
  }
  return (
    <>
      <NormalSubHeader
        normalSubHeaderProps={normalSubHeader}
        normalSubHeaderLoginProps={normalLoginParam}
      />
      <Row
        type="flex"
        justify="center"
        style={{ marginTop: 32, marginBottom: 24 }}>
        <Col xs={{ span: 24 }} sm={{ span: 14 }}>
          <Content
            style={{
              width: '100%',
              padding: '32px 50px 0 0',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.1)',
              borderRadius: 6
            }}>
            <Layout>
              {showSider ? (
                <Sider style={{ backgroundColor: '#ffffff' }}>
                  <Menu
                    className="desc"
                    style={{ height: '100%' }}
                    mode="vertical-left"
                    onClick={menuItemClick}
                    selectedKeys={[selectedMenuItem.title]}>
                    {MenuItems.map(item => {
                      return (
                        <Menu.Item key={item}>
                          <div
                            className="menu-item-style"
                            style={
                              item === selectedMenuItem.title
                                ? {
                                    backgroundColor: '#29b6f6',
                                    color: '#ffffff'
                                  }
                                : { color: '#333333' }
                            }>
                            {item}
                          </div>
                        </Menu.Item>
                      )
                    })}
                  </Menu>
                </Sider>
              ) : null}
              <div
                style={{
                  width: '100%',
                  backgroundColor: '#ffffff',
                  paddingLeft: 28
                }}>
                {selectedMenuItem.id === 0 ? <UserConnect /> : null}
                {selectedMenuItem.id === 1 ? <Business /> : null}
                {selectedMenuItem.id === 2 ? <Tools /> : null}
                {selectedMenuItem.id === 3 ? <OpenData /> : null}
              </div>
            </Layout>
          </Content>
        </Col>
      </Row>
    </>
  )
}

export default Agency
