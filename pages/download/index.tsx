import { Row, Col } from 'antd'
import './index.less'
import PersonalComp from '../../components/PersonalComp'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
const Personal = () => {
  return (
    <>
      <PersonalComp activePath={'download'} showLoginBtn={false} />
      <Row type="flex" justify="center" align="middle">
        <Col span={24}>
          <div className="download-content">
            <img className="desc" src="static/images/personal/slogan7.png" />
            <div className="code">
              <img src="static/images/personal/download.png" />
              <img src="static/images/personal/follow_us.png" />
            </div>
          </div>
        </Col>
      </Row>
      <style jsx>{`
        .download-content {
          height: calc(100vh - 80px);
          background-size: cover;
          background: url(${publicRuntimeConfig.staticFolder}/images/personal/beijing6.jpg)
            center no-repeat;
        }
      `}</style>
    </>
  )
}

export default Personal
