import './index.less'
import NormalSubHeader from '../../components/NormalSubHeader'
import { NormalSubHeaderProps } from '../../types/NormalSubHeader'
import { Row, Col } from 'antd'
import SingleBannerComp from '../../components/SingleBannerComp'
import InvoiceCollectConfig from '../../constant/InvoiceCollect'
const InvoiceCollection = () => {
  const normalSubHeader: NormalSubHeaderProps = {
    styleMode: 0,
    activePath: 'invoiceCollect'
  }
  return (
    <div className="invoice-collection">
      <NormalSubHeader normalSubHeaderProps={normalSubHeader} />
      <SingleBannerComp
        image={'invoiceCollect/banner.png'}
        smHeight={380}
        xsHeight={150}
      />
      <div style={{ paddingBottom: 200 }}>
        {InvoiceCollectConfig.map((g, index) => {
          return (
            <div key={`${g.name}-${index}`}>
              <Row
                key={g.name}
                type="flex"
                style={{ marginTop: 28, marginBottom: 19 }}>
                <Col
                  xs={{ offset: 1 }}
                  sm={{ offset: 1 }}
                  xl={{ offset: 4 }}
                  style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                    style={{ width: 12, height: 12 }}
                    src="static/images/invoiceCollect/pre.png"
                    alt="前置图标"
                  />
                  <span style={{ fontSize: 24, marginLeft: 14 }}>{g.name}</span>
                </Col>
              </Row>
              <Row key={index} type="flex" justify="center" gutter={[20, 20]}>
                {g.items.map(item => {
                  return (
                    <Col
                      key={`${g.name}-${item.title}`}
                      xs={{ span: 22 }}
                      sm={{ span: 11 }}
                      xl={{ span: 4 }}>
                      <div
                        className="collection-item"
                        style={{
                          backgroundColor: '#ffffff',
                          width: '100%',
                          height: 228,
                          textAlign: 'center',
                          paddingBottom: 30
                        }}>
                        <img
                          style={{ width: 72, height: 72, marginTop: 59 }}
                          src={item.src}
                        />
                        <p
                          style={{
                            color: '#000000',
                            marginTop: 10,
                            fontSize: 18
                          }}>
                          {item.title}
                        </p>
                        <p
                          style={{
                            color: '#999999',
                            fontSize: 14,
                            marginTop: 2
                          }}>
                          {item.subTitle}
                        </p>
                      </div>
                    </Col>
                  )
                })}
              </Row>
            </div>
          )
        })}
      </div>
      <style jsx>{`
        .collection-item:hover {
          border: 1px solid #3d8ae7;
        }
      `}</style>
    </div>
  )
}

export default InvoiceCollection
