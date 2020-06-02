import './common.less'
import { Row, Col, Divider } from 'antd'
const content = [
  {
    title: '发票录入、打印综合工具',
    step: [
      '1.为财税机构提供高效的发票采集工具，包括电子发票录入工具、纸质发票扫描工具，方便进行录入发票。',
      '2.为财税机构提供高效的电子发票批量排版、打印工具',
      '3.为财税机构提供实时的发票查询工具'
    ]
  },
  {
    title: '管理工具',
    desc:
      '为财税机构提供高效的内部管理工具，实现对企业服务的权限管理、业务管理，以及相关的统计、会计人员变更等工具'
  },
  {
    title: '财税系统衔接',
    desc:
      '为财税机构提供对接财务系统、税务系统的各类接口和配置管理，实现与已有的财税系统衔接。'
  }
]
const Tools = () => {
  return (
    <>
      <p className="title">工具赋能</p>
      <p className="sub-title">
        实现财税机构提供相关工具，方便财税机构更好的服务企业，更好的衔接财税系统，提高工作效率。
      </p>
      <Divider />
      <Row type="flex" justify="center">
        <Col xs={{ span: 22 }} sm={{ span: 24 }}>
          <div style={{ textAlign: 'center' }}>
            <img
              className="content-img"
              src="/static/images/agency/tip2.png"
              alt="工具赋能"
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
