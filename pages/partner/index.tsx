import NormalSubHeader from '../../components/NormalSubHeader'
import { NormalSubHeaderProps } from '../../types/NormalSubHeader'
import { Row, Col, Divider } from 'antd'
import SingleBannerComp from '../../components/SingleBannerComp'
import EnterpriseConfig from '../../constant/EnterpriseConfig'
const Partner = () => {
  const normalSubHeader: NormalSubHeaderProps = {
    styleMode: 0,
    activePath: 'partner'
  }
  return (
    <>
      <NormalSubHeader normalSubHeaderProps={normalSubHeader} />
      <SingleBannerComp
        image={'partner/banner.png'}
        smHeight={350}
        xsHeight={150}
      />
      <div style={{ paddingBottom: 200 }}>
        <Row type="flex" justify="center">
          <Col>
            <p
              style={{
                fontSize: 32,
                color: '#333333',
                marginTop: 37,
                marginBottom: 0
              }}>
              合作伙伴
            </p>
            <Divider style={{ backgroundColor: '#108ee9', height: 2 }} />
          </Col>
        </Row>
        <Row type="flex" justify="center" gutter={[20, 20]}>
          {EnterpriseConfig.EnterpriseOAServices.map(item => {
            return (
              <Col
                xs={{ span: 22 }}
                sm={{ span: 11 }}
                xl={{ span: 5}}
                key={item.title}>
                <div
                  className="content-item"
                  style={{
                    backgroundColor: '#ffffff',
                    paddingBottom: 30,
                    height: 286,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    boxShadow: '0 0 16px rgba(2,2,2,.08)'
                  }}>
                  <img
                    style={{ width: 160, height: 60, marginTop: 100 }}
                    src={item.src}
                    alt={item.title}
                  />
                  <div style={{ fontSize: 23, marginTop: 20 }}>
                    {item.title}
                  </div>
                  <div
                    style={{ fontSize: 13, color: '#888888', marginTop: 20 }}>
                    {item.subTitle}
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
      <style jsx>
        {`
          .content-item:hover {
            border: 1px solid #b0cff5;
          }
        `}
      </style>
    </>
  )
}

export default Partner
