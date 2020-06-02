import Link from 'next/link'
import { Row, Col } from 'antd'
import './index.less'
import ThirdSitePath from '../../constant/ThirdSitePath'
//关于
const about = 'about'
//下载
const downloadUrl = 'download'

const FooterContent = () => {
  return (
    <>
      <Row type="flex" justify="center" className="footer-content">
        <Col
          xs={{ span: 23, offset: 1 }}
          sm={{ span: 8 }}
          md={{ span: 8, offset: 0 }}
          lg={{ span: 7, offset: 1 }}
          xxl={{ span: 4, offset: 2 }}>
          <div className="down-load-area">
            <div style={{ marginBottom: '20px' }}>
              <img
                className="bottom-logo"
                style={{ textAlign: 'left' }}
                src="static/images/home/down_logo.png"
              />
            </div>
            <Row
              type="flex"
              justify="center"
              className="down-load-btn"
              gutter={[0, 10]}>
              <Col span={3}>
                <Link href={downloadUrl}>
                  <a>
                    <img src="static/images/home/weixin.png" />
                  </a>
                </Link>
              </Col>
              <Col span={3}>
                <Link href={downloadUrl}>
                  <a>
                    <img src="static/images/home/weibo.png" />
                  </a>
                </Link>
              </Col>
              <Col span={3}>
                <Link href={downloadUrl}>
                  <a>
                    <img src="static/images/home/dingding.png" />
                  </a>
                </Link>
              </Col>
              <Col span={3}>
                <Link href={downloadUrl}>
                  <a>
                    <img src="static/images/home/qiyeweixin.png" />
                  </a>
                </Link>
              </Col>
              <Col span={6}>
                <Link href={downloadUrl}>
                  <a>
                    <img className="special" src="static/images/home/ios.png" />
                  </a>
                </Link>
              </Col>
              <Col span={6}>
                <Link href={downloadUrl}>
                  <a>
                    <img
                      className="special"
                      src="static/images/home/android.png"
                    />
                  </a>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col
          className="footer-content-col"
          xs={{ span: 23, offset: 1 }}
          sm={{ span: 8 }}
          md={{ span: 6, offset: 1 }}
          lg={{ span: 6, offset: 1 }}
          xxl={{ span: 3, offset: 1 }}>
          <div className="partner">
            <p>合作伙伴</p>
            <Row
              type="flex"
              justify="start"
              gutter={[8, 16]}
              style={{ margin: 0 }}
              className="partner-row">
              <Col xs={{ span: 6 }} sm={{ span: 12 }}>
                <Link href={ThirdSitePath.yanhuangHref}>
                  <a>
                    <img
                      style={{ width: '78px', height: '24px' }}
                      src="static/images/home/yanhuang.png"
                    />
                  </a>
                </Link>
              </Col>
              <Col xs={{ span: 6 }} sm={{ span: 12 }}>
                <Link href={ThirdSitePath.jinhuaHref}>
                  <a>
                    <img
                      style={{ width: '24px', height: '24px' }}
                      src="static/images/home/jinghua.png"
                    />
                  </a>
                </Link>
              </Col>
              <Col xs={{ span: 6 }} sm={{ span: 12 }}>
                <Link href={ThirdSitePath.zhongruanHref}>
                  <a>
                    <img
                      style={{ width: '56px', height: '24px' }}
                      src="static/images/home/zhongruan.png"
                    />
                  </a>
                </Link>
              </Col>
              <Col xs={{ span: 6 }} sm={{ span: 12 }}>
                <Link href={ThirdSitePath.pingaoHref}>
                  <a>
                    <img
                      style={{ width: '36px', height: '24px' }}
                      src="static/images/home/pingao.png"
                    />
                  </a>
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col
          className="footer-content-col"
          xs={{ span: 23, offset: 1 }}
          sm={{ span: 4 }}
          md={{ span: 3, offset: 0 }}
          lg={{ span: 3, offset: 1 }}
          xxl={{ span: 2, offset: 1 }}>
          <Link href={ThirdSitePath.newLink}>
            <a className="link-title">新闻动态</a>
          </Link>
        </Col>
        <Col
          className="footer-content-col"
          xs={{ span: 23, offset: 1 }}
          sm={{ span: 4 }}
          md={{ span: 3, offset: 0 }}
          lg={{ span: 3, offset: 2 }}
          xxl={{ span: 2, offset: 1 }}>
          <Link href={about}>
            <a className="link-title">关于我们</a>
          </Link>
        </Col>
      </Row>
    </>
  )
}

export default FooterContent
