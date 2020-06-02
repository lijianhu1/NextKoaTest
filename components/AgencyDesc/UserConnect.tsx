import './common.less'
import { Row, Col, Divider } from 'antd'
const content = [
  {
    title: '企业授权连接',
    desc:
      '财税机构向企业发起申请，企业系统管理员（或指定人员）审核同意后，可以实现企业与财税机构有效连接。 双方可以双向授权和解除授权。企业授权后，提供如下两层基础的连接能力：'
  },
  {
    subTitle: '第一层：企业基础连接',
    step: [
      '1. 企业允许财税机构连接后，企业可以实时将相关发票、个税以及其它必要的资料或文件提交给财税机构。',
      '2. 财税机构可以将相关的信息、新闻推送给对应的企业财务。'
    ]
  },
  {
    subTitle: '第二层：企业员工连接',
    desc:
      '如果企业进一步授权，财税机构可以直接连接到的员工，可以实时帮助企业处理员工报销、个税申报等相关业务， 可以实现财税机构直接连接到对应的企业员工进行业务处理。'
  },
  {
    title: '企业员工授权连接',
    desc:
      '财税机构向企业员工发起申请，如果企业员工同意允许后，可以帮助企业员工进行家庭个税的综合服务管理。'
  }
]
const UserConnect = () => {
  return (
    <>
      <p className="title">用户连接</p>
      <p className="sub-title">
        为财税机构提供连接企业的能力，通过企业授权，可以实现财税机构与企业用户的财务、员工进行有效连接；
        未来，如果员工授权允许，可连接到员工家庭个税服务。
      </p>
      <Divider />
      <Row type="flex" justify="center">
        <Col xs={{ span: 22 }} sm={{ span: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <img
              className="content-img"
              src="/static/images/agency/step.png"
              alt="用户连接"
            />
          </div>
        </Col>
      </Row>
      {content.map(item => {
        return (
          <Row key={item.title || item.subTitle}>
            <Col>
              <div className="des-content">
                {item.title ? (
                  <img src="/static/images/agency/blue.png" />
                ) : null}
                <span style={item.subTitle ? { marginLeft: 30 } : null}>
                  {item.title || item.subTitle}
                </span>
                {item.desc ? (
                  <p>{item.desc}</p>
                ) : (
                  <>
                    {item.step.map((i, index) => {
                      return <p key={index}>{i}</p>
                    })}
                  </>
                )}
              </div>
            </Col>
          </Row>
        )
      })}
    </>
  )
}

export default UserConnect
