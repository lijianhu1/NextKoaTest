import { Row, Col } from 'antd'
import './index.less'
import getConfig from 'next/config'
import PersonalComp from '../../components/PersonalComp'
const { publicRuntimeConfig } = getConfig()
const Personal = () => {
  return (
    <>
      <PersonalComp activePath={'about'} showLoginBtn={false} />
      <Row type="flex" justify="center" align="middle">
        <Col span={24}>
          <div className="about-content">
            <div className="content-item left-top">
              <h4>
                <img src="static/images/personal/about-des.png" alt="图标" />
                公司简介
              </h4>
              <p>
                广州湛蓝数据科技有限公司成立于2016年,专注于企业级移动门户平台,同时提供公有云与私有云两个方向的服务。
              </p>
              <p>
                广州湛蓝创始团队来源于包括腾讯、IBM、HP、新太等多家企业高管,公司总部位于广州高新软件园区,
                在北京和武汉设立两个分支机构。2017年3月,国内著名风投资本进行2000万A轮投资。
              </p>
            </div>
            <img
              className="left-connect"
              src="static/images/personal/left-connect.png"
            />
            <div className="content-item right-middle">
              <h4>
                <img src="static/images/personal/about-des.png" alt="图标" />
                企业文化
              </h4>
              <p>
                票税宝是广州湛蓝数据科技有限公司旗下新推的明星产品，是以提升用户票税体验为中心的一站式发票管理服务平台。
              </p>
              <p>
                目前，票税宝除了闪电开票、发票存储、抬头信息共享等基础功能以外，还能为广大用户提供发票统计、发票邮箱、第三方采集等特色功能，选择我们，让票税管理更便捷！
              </p>
            </div>
            <img
              className="right-connect"
              src="static/images/personal/right-connect.png"
            />
            <div className="content-item left-bottom">
              <h4>
                <img src="static/images/personal/about-des.png" alt="图标" />
                加入我们
              </h4>
              <p>电话：020-38732966</p>
              <p>广东省广州市黄埔区联和街道科学大道112号，广州绿地中央广场C3</p>
              <p>邮箱/传真：customer@deepblue.ltd</p>
              <div className="bottom">
                <span>扫码体验全新的票税生活</span>
                <img
                  style={{ width: 50 }}
                  src="static/images/personal/qrscan.jpg"
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <style jsx>{`
        .about-content {
          background: url(${publicRuntimeConfig.staticFolder}/images/personal/beijing7.jpg)
            center no-repeat;
        }
      `}</style>
    </>
  )
}

export default Personal
