import './index.less'
import { Row, Col } from 'antd'
import Link from 'next/link'
import EnterpriseComp from '../../components/EnterpriseComp'
import ThirdSitePath from '../../constant/ThirdSitePath'
import EnterpriseConfig from '../../constant/EnterpriseConfig'
import SingleBannerComp from '../../components/SingleBannerComp'
const PlatformIntroduce = () => {
  return (
    <div className="platform-introduce">
      <EnterpriseComp activePath={'platformIntroduce'} loginRouter={null} />
      <SingleBannerComp
        image={'enterprise/platform-introduce-banner.png'}
        smHeight={440}
        xsHeight={150}
      />
      <Row className="introduce-content-title">
        <Col offset={2}>
          <img src="static/images/enterprise/china.png" alt="国徽" />
          <Link href={ThirdSitePath.accountMeasure}>
            <a>《中华人民共和国财政部 国家档案局令第79号——会计档案管理办法》</a>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col span={20} offset={2}>
          <Row type="flex" justify="center" gutter={[20, 30]}>
            {EnterpriseConfig.IntroduceContentConfig.map(item => {
              return (
                <Col
                  xs={{ span: 24 }}
                  sm={{ span: 12 }}
                  md={{ span: 8 }}
                  xxl={{ span: 4 }}
                  key={item.title}>
                  <div className="introduce-content-item">
                    <img src={item.src} alt={item.title} />
                    <p>{item.title}</p>
                    <p>{item.subTitle}</p>
                  </div>
                </Col>
              )
            })}
          </Row>
        </Col>
        <Col span={2}> </Col>
      </Row>
      <div
        className="introduce-bottom"
        style={{
          backgroundImage: 'url(/static/images/enterprise/bottom_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      />
    </div>
  )
}

export default PlatformIntroduce
