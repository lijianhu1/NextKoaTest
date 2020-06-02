import { Row, Col, Divider } from 'antd'
const content = [
  {
    title: '发票传输协作',
    desc:
      '企业可以一键分享的方式，将各类电子发票、纸质发票OCR信息传递给财税机构，方便财税机够可以更快 的进行记账、报税。可以提高效率，减少寄出纸质凭证的次数。'
  },
  {
    title: '个税信息传输协作',
    desc:
      '企业可实时的传递企业员工人员的增减、工资薪酬的变化，方便财税机构可以快速的进行每月企业个税的 申报。'
  },
  {
    title: '消息提醒、新闻推送与即时沟通',
    desc:
      '财税机构和企业之间可以实时的进行业务处理的消息推送，财税机构可以定期或不定期推送财税新闻和业 务信息，可以实时沟通。'
  },
  {
    title: '应用分发',
    desc:
      '财税机构可以自主发布相关的财税应用、企业应用以及其它的应用，对自己服务的企业进行应用分发。'
  }
]
const Business = () => {
  return (
    <>
      <p className="title">业务协作</p>
      <p className="sub-title">
        实现财税机构和企业之间，进行企业的发票、个税以及财税服务的协作处理，让财税机构更好的服务企业，
        以及企业的员工
      </p>
      <Divider />
      <Row type="flex" justify="center">
        <Col xs={{ span: 22 }} sm={{ span: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <img
              className="content-img"
              src="/static/images/agency/step.png"
              alt="业务协作"
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
                <p>{item.desc}</p>
              </div>
            </Col>
          </Row>
        )
      })}
    </>
  )
}

export default Business
