import { Row, Col, Icon } from 'antd'
import { NormalSubHeaderProps } from '../../types/NormalSubHeader'
import NormalSubHeader from '../../components/NormalSubHeader'
const AgencyRegisterSuccess = () => {
  const normalSubHeaderProps: NormalSubHeaderProps = {
    styleMode: 0,
    backgroundColor: '#ffffff'
  }
  return (
    <>
      <NormalSubHeader normalSubHeaderProps={normalSubHeaderProps} />
      <Row type="flex" justify="center" style={{ marginTop: 50, marginBottom: 60 }}>
        <Col
          xs={{ span: 23 }}
          sm={{ span: 22 }}
          md={{ span: 19 }}
          lg={{ span: 19 }}
          xl={{ span: 14 }}
          xxl={{ span: 10 }}
          style={{
            padding: '32px 50px 56px',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,.1)',
            borderRadius: 6,
            backgroundColor: '#ffffff'
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <Icon type="check-circle" theme="filled" style={{ fontSize: 50, color: '#60c745',marginTop:50,marginBottom:27 }} />
            <p style={{ fontSize: 24, color: '#404040' }}>注册成功，我们会在3个工作日内审核</p>
            <p style={{ fontSize: 16, color: '#666666' }}>审核通过后即可使用管理员账号登录</p>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AgencyRegisterSuccess
