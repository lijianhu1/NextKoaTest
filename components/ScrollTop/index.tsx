import { BackTop } from 'antd'

const ScrollTop = () => {
  return (
    <>
      <BackTop>
        <div className="ant-back-top-inner">回到顶部</div>
        <div className="ant-back-top-content">
          <div className="ant-back-top-icon" />
        </div>
      </BackTop>
      <style jsx>
        {`
          .ant-back-top-inner {
            text-align: center;
            width: 80px;
            color: rgb(24, 144, 255);
            position: absolute;
            top: -30%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .ant-back-top-content {
            background-color: rgb(24, 144, 255, 0.65);
          }
          .ant-back-top-content:hover {
            background-color: rgb(24, 144, 255);
          }
          .ant-back-top {
            width: 40px;
            height: 40px;
            overflow: hidden;
            color: #fff;
            text-align: center;
            border-radius: 20px;
            transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
          }
        `}
      </style>
    </>
  )
}

export default ScrollTop
