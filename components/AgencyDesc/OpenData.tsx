import './common.less'
import { Row, Col, Divider } from 'antd'
const content = [
  {
    title: '企业数据开放',
    step: [
      '1.如果企业授权允许，财税机构可以实时查看和访问录入的进销项发票。',
      '2.如果企业授权允许，财税机构可以实时查看和访问员工同步的发票。',
      '3.如果企业授权允许，财税机构可以实时查看企业员工增减和薪酬数据。'
    ]
  },
  {
    title: '企业员工数据开放',
    desc:
      '如果企业授权允许，财税机构可以实时查看员工个人的有关企业抬头的“发票”以及报销单据。'
  },
  {
    title: '企业员工家庭数据开放',
    desc:
      '如果员工授权同意，财税机构可以在授权的情况下，查看员工和员工家庭的“个人”抬头发票，方便帮助 员工完成家庭个税管理服务。'
  }
]
const Tools = () => {
  return (
    <>
      <p className="title">数据开放</p>
      <p className="sub-title">
        为财税机构提供企业的数据开放能力，通过企业授权，财税机构可以实时访问和查看企业录入的进销项票、
        员工录入的费用发票，以及各类其它关键数据。
      </p>
      <Divider />
      <Row type="flex" justify="center">
        <Col xs={{ span: 22 }} sm={{ span: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <img
              className="content-img"
              src="/static/images/agency/tip3.png"
              alt="数据开放"
            />
          </div>
        </Col>
      </Row>
      {content.map(item => {
        return (
          <Row key={item.title}>
            <Col>
              <div className="des-content">
                <img src="/static/images/agency/blue.png" />
                <span>{item.title}</span>
                {item.step ? (
                  <>
                    {item.step.map((i, index) => {
                      return <p key={index}>{i}</p>
                    })}
                  </>
                ) : (
                  <p>{item.desc}</p>
                )}
              </div>
            </Col>
          </Row>
        )
      })}
    </>
  )
}

export default Tools
