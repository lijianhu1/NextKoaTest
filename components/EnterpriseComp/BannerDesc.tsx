const BannerDesc = ({ isFolder = true }) => {
  return (
    <div className="desc">
      <p>企业票税管理中心</p>
      {isFolder ? (
        <p>
          注：进入企业票夹后，点击左边的“邀请员工”，可以邀请员工加入企业。加入企业后，员工在票税宝APP和票税宝小程序添加的企业发票，均会自动进入企业票夹
        </p>
      ) : null}

      <style jsx>
        {`
          .desc {
            position: absolute;
            top: 150px;
            width: 550px;
            font-size: 20px;
            color: #ffffff;
          }
          p:nth-child(1) {
            margin-bottom: 20px;
            letter-spacing: 8px;
            text-shadow: 3px 2px 11px black;
          }
          @media (min-width: 576px) {
            .desc {
              left: 50px;
            }
            p:nth-child(1) {
              font-size: 60px;
            }
          }
          @media (min-width: 1400px) {
            .desc {
              left: 200px;
            }
          }
          @media (min-width: 1600px) {
            .desc {
              left: 373px;
            }
          }
          @media (max-width: 576px) {
            .desc {
              top: 20%;
              left: 50%;
              transform: translate(-50%, -50%);
              text-align: center;
              padding: 0 100px;
            }
            p:nth-child(1) {
              font-size: 15px;
            }
            p:nth-child(2) {
              font-size: 12px;
            }
          }
        `}
      </style>
    </div>
  )
}
export default BannerDesc
