import { Row, Col, Divider } from 'antd'
import Link from 'next/link'
import './index.less'
const dividerStyle = {
  backgroundColor: '#999999',
  height: '38px',
  marginRight: '20px'
}

const aStyle = {
  fontSize: 13,
  color: '#333333'
}

interface ISpecialSubHeaderProps {
  showHeaderDes: boolean
}

const SpecialSubHeader = (props: ISpecialSubHeaderProps) => {
  return (
    <Row
      type="flex"
      align="middle"
      style={{ backgroundColor: '#ffffff', height: 60 }}>
      <Col
        xs={{ span: 4, offset: 1 }}
        sm={{ span: 5, offset: 1 }}
        md={{ span: 5, offset: 1 }}
        lg={{ span: 2, offset: 6 }}
        xl={{ span: 2, offset: 6 }}
        xxl={{ span: 2, offset: 6 }}>
        <Link prefetch href="/">
          <a>
            <img className="header_logo" src="/static/images/header_logo.png" />
          </a>
        </Link>
      </Col>
      {props.showHeaderDes ? (
        <Col
          xs={{ span: 9, offset: 0 }}
          sm={{ span: 8, offset: 1 }}
          md={{ span: 8, offset: 1 }}
          lg={{ span: 6, offset: 1 }}
          xl={{ span: 6, offset: 1 }}
          xxl={{ span: 6, offset: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Divider className="divider" type="vertical" style={dividerStyle} />
            <span
              className="reset_pwd_txt"
              style={{ fontSize: 24, color: '#666' }}>
              重置登录密码
            </span>
          </div>
        </Col>
      ) : null}
      <Col
        xs={{ span: 9, offset: props.showHeaderDes ? 0 : 3 }}
        sm={{ span: 6, offset: props.showHeaderDes ? 0 : 2 }}
        md={{ span: 8, offset: props.showHeaderDes ? 1 : 2 }}
        lg={{ span: 4, offset: props.showHeaderDes ? 0 : 3 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#333',
            fontSize: 13
          }}>
          <Link href="personal">
            <a style={aStyle}>首页</a>
          </Link>
          <Link href="download">
            <a style={aStyle}>下载</a>
          </Link>
          <Link href="about">
            <a style={aStyle}>关于我们</a>
          </Link>
        </div>
      </Col>
    </Row>
  )
}

export default SpecialSubHeader
