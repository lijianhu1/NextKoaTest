import './index.less'
import { useCallback, useState } from 'react'
import OpenPlatformComp from '../../components/OpenPlatformComp'
import { Row, Col, Divider, Button, Modal, Icon } from 'antd'
import OpenPlatformConfig from '../../constant/OpenPlatformConfig'
import getConfig from 'next/config'
import SingleBannerComp from '../../components/SingleBannerComp'
const { publicRuntimeConfig } = getConfig()
const OpenPlatform = () => {
  const [activeItem, setActiveItem] = useState('')
  const [activeOpenTitle, setActiveOpenTitle] = useState('')
  const mouseEnter = useCallback(e => {
    setActiveItem(e.currentTarget.dataset.title)
  }, [])
  const mouseLeave = useCallback(() => {
    setActiveItem('')
  }, [])

  const mouseEnterOpenDomain = useCallback(e => {
    let title = e.currentTarget.dataset.title
    setActiveOpenTitle(title)
  }, [])
  const mouseLeaveOpenDomain = useCallback(() => {
    setActiveOpenTitle('')
  }, [])

  const applyCooperation = useCallback(() => {
    Modal.info({
      title: '商务合作',
      centered: true,
      okText: '关闭',
      content: (
        <div>
          <div>
            <Icon type="home" theme="twoTone" style={{ fontSize: 20 }} />
            <span>广州湛蓝数据科技有限公司</span>
          </div>
          <div className="address">
            <Icon type="environment" theme="twoTone" style={{ fontSize: 20 }} />
            <span>
              广东省广州市黄埔区联和街道科学大道112号，广州绿地中央广场C3
            </span>
          </div>
          <div>
            <Icon type="phone" theme="twoTone" style={{ fontSize: 20 }} />
            <span>020-38732966</span>
          </div>
          <div>
            <Icon type="mail" theme="twoTone" style={{ fontSize: 20 }} />
            <span>customer@deepblue.ltd</span>
          </div>
          <style jsx>{`
            .ant-modal-confirm .ant-modal-body {
              padding: none;
            }
            .ant-modal-confirm-info .ant-modal-confirm-body > .anticon {
              display: none;
            }
            .ant-modal-confirm-body .ant-modal-confirm-title {
              font-size: 22px;
            }
            div {
              margin-bottom: 10px;
            }
            .address {
              display: flex;
            }
            span {
              font-size: 17px;
              color: #777777;
              margin-left: 20px;
            }
          `}</style>
        </div>
      ),
      onOk() { }
    })
  }, [])

  return (
    <div className="open-platform">
      <OpenPlatformComp activePath={'openPlatform'} />
      <SingleBannerComp
        image={'platform/banner.png'}
        smHeight={350}
        xsHeight={150}
      />
      <div className="business-cooperation">
        <Row type="flex" justify="center">
          <Col>
            <p className="business-cooperation-title">商业合作</p>
          </Col>
        </Row>
        <Row className="business-cooperation-content" gutter={[30, 30]}>
          <Col
            xs={{ span: 0 }}
            sm={{ span: 1 }}
            lg={{ span: 1 }}
            xl={{ span: 1 }}
            xxl={{ span: 4 }}
          />
          {OpenPlatformConfig.BusinessConfig.map(col => {
            return (
              <Col
                key={col.name}
                xs={{ span: 22 }}
                sm={{ span: 20 }}
                lg={{ span: 15 }}
                xl={{ span: 11 }}
                xxl={{ span: 8 }}>
                <div className="open-desc-item">
                  <div className="open-desc-item-top">
                    <img src="static/images/bg3.png" />
                    <p>{col.name}</p>
                    <p>{col.desc}</p>
                  </div>
                  <Row
                    gutter={[10, 10]}
                    type="flex"
                    justify="space-around"
                    className="open-desc-item-bottom">
                    {col.items.map(item => {
                      return (
                        <Col
                          xs={{ span: 12 }}
                          sm={{ span: 6 }}
                          key={item.title}
                          data-title={item.title}
                          onMouseEnter={mouseEnter}
                          onMouseLeave={mouseLeave}>
                          {activeItem === item.title ? (
                            <img src={item.activeSrc} alt={item.title} />
                          ) : (
                              <img src={item.src} alt={item.title} />
                            )}

                          <span
                            style={
                              activeItem === item.title
                                ? { color: '#29abe2' }
                                : null
                            }>
                            {item.title}
                          </span>
                        </Col>
                      )
                    })}
                  </Row>
                </div>
              </Col>
            )
          })}
          <Col
            xs={{ span: 0 }}
            sm={{ span: 1 }}
            lg={{ span: 1 }}
            xl={{ span: 1 }}
            xxl={{ span: 4 }}
          />
        </Row>
      </div>
      <div className="all-platform">
        <Row type="flex" justify="center">
          <Col>
            <p className="all-platform-title">全平台合作</p>
            <Divider
              className="all-platform-divide"
              style={{
                backgroundColor: '#108ee9'
              }}
            />
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={[20, 10]}>
          {OpenPlatformConfig.AllPlatform.map(item => {
            return (
              <Col
                key={item.title}
                xs={{ span: 22 }}
                sm={{ span: 18 }}
                md={{ span: 16 }}
                lg={{ span: 7 }}
                xl={{ span: 5 }}>
                <div className="open-all-platform">
                  <img src={item.src} alt={item.title} />
                  <p>{item.title}</p>
                  <p>{item.subTitle}</p>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
      <div className="open-domain">
        <div className="open-domain-content">
          <Row type="flex" justify="center">
            <Col>
              <p className="open-domain-content-title">开放能力版图</p>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col
              xs={{ span: 0 }}
              md={{ span: 1 }}
              lg={{ span: 1 }}
              xl={{ span: 2 }}
              xxl={{ span: 4 }}
            />
            <Col
              xs={{ span: 23 }}
              md={{ span: 22 }}
              lg={{ span: 22 }}
              xl={{ span: 20 }}
              xxl={{ span: 16 }}>
              <Row
                type="flex"
                style={{ alignItems: 'center', justifyContent: 'center' }}>
                {OpenPlatformConfig.OpenDomain.map(item => {
                  return (
                    <Col
                      xs={{ span: 23 }}
                      sm={{ span: 12 }}
                      md={{ span: 12 }}
                      lg={{ span: 6 }}
                      key={item.title}>
                      <div
                        style={{
                          position: 'relative',
                          height: '100%',
                          width: '100%',
                          backgroundImage: `url(${item.src})`,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          textAlign: 'center',
                          color: '#ffffff'
                        }}
                        data-title={item.title}
                        onMouseEnter={mouseEnterOpenDomain}
                        onMouseLeave={mouseLeaveOpenDomain}>
                        <img
                          style={{ marginTop: 74, width: 80, height: 80 }}
                          src={item.ico}
                          alt={item.title}
                        />
                        <p style={{ fontSize: '31px', marginTop: 1 }}>
                          {item.title}
                        </p>
                        <p style={{ fontSize: '16px', paddingBottom: 40 }}>
                          {item.subTitle}
                        </p>
                        <div
                          className="layer-style"
                          style={
                            activeOpenTitle === item.title
                              ? {
                                overflow: 'visible',
                                width: '100%',
                                transition: 'width .35s ease'
                              }
                              : null
                          }>
                          <p>{item.lay.title}</p>
                          <p />
                          <p>{item.lay.detail}</p>
                          <p>详情&gt;</p>
                        </div>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </Col>
            <Col
              xs={{ span: 0 }}
              md={{ span: 1 }}
              lg={{ span: 1 }}
              xl={{ span: 2 }}
              xxl={{ span: 4 }}
            />
          </Row>
          <Row type="flex" justify="center">
            <Col>
              <Button
                className="open-domain-content-footer"
                style={{
                  backgroundColor: '#108ee9',
                  color: '#ffffff'
                }}
                onClick={applyCooperation}>
                申请合作
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <style jsx>
        {`
          .all-platform {
            padding-bottom: 100px;
            background: url(${publicRuntimeConfig.staticFolder}/images/platform/bg.png)
              center no-repeat;
          }
          .open-domain {
            background-color: #ffffff;
          }
          .open-domain-content {
            background: url(${publicRuntimeConfig.staticFolder}/images/platform/bg2.png)
              164px 48px no-repeat;
          }
          .layer-style {
            position: absolute;
            top: 0;
            left: 0;
            width: 0;
            height: 100%;
            background-color: rgba(0, 126, 243, 0.8);
            overflow: hidden;
          }
        `}
      </style>
    </div>
  )
}

export default OpenPlatform
