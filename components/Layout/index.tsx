import { Layout } from 'antd'
import './index.less'
const { Header, Content, Footer } = Layout
import NormalHeader from '../NormalHeader'
import ScrollTop from '../ScrollTop'
import LoadingComp from '../LoadingComp'
import { NoShowTopHeaderWhiteList } from '../../config/constantData'
import { withRouter } from 'next/router'
const getCurrentYear = () => {
  return new Date().getFullYear()
}

const PsbLayout = ({ router, children }) => {
  const [Component] = children
  const isPc = router.query.isPc && router.query.isPc.length > 0
  const noShowTopHeader = NoShowTopHeaderWhiteList.indexOf(router.pathname) > -1 || isPc //  /^\/$/.test(router)
  // console.log(16, noShowTopHeader)
  return (
    <Layout>
      <LoadingComp />
      {!noShowTopHeader ? (
        <Header
          className="layout-header"
          style={{ backgroundColor: '#1e1b29', height: 25, lineHeight: 25 }}>
          <NormalHeader />
        </Header>
      ) : null}
      <Content className="test" style={noShowTopHeader ? null : { marginTop: 97 }}>
        {Component}
      </Content>
      <ScrollTop />
      <Footer>
        <div className="footer">
          <span style={{ fontSize: 11 }}>
            Copyright © 2016-{getCurrentYear()} 广州湛蓝数据科技有限公司 版权所有
          </span>
          <span style={{ fontSize: 11, marginTop: '6px' }}>粤ICP备18023998号</span>
        </div>
      </Footer>
      <style jsx>{`
        .footer {
          background-color: #313131;
          color: #888888;
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      `}</style>
      <style jsx global>{`
        #__next,
        .ant-layout {
          height: 100%;
          overflow-x: hidden;
        }
        .ant-layout-header {
          padding: 0;
        }
        .ant-layout-content {
          flex: 1 0 auto;
          background-color: #f8f8f8;
        }
        .ant-layout-footer {
          padding: 0;
          font-size: 12px;
        }
        ::-webkit-scrollbar {
          width: 5px;
          height: 5px;
        }

        ::-webkit-scrollbar-track-piece {
          background-color: rgba(0, 0, 0, 0.2);
          -webkit-border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:vertical {
          height: 5px;
          background-color: rgba(125, 125, 125, 0.7);
          -webkit-border-radius: 6px;
        }

        ::-webkit-scrollbar-thumb:horizontal {
          width: 5px;
          background-color: rgba(125, 125, 125, 0.7);
          -webkit-border-radius: 6px;
        }
      `}</style>
    </Layout>
  )
}

export default withRouter(PsbLayout)
