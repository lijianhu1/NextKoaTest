const ScanLogin = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 31
      }}>
      <span
        style={{
          fontSize: 15,
          fontWeight: 'bold',
          color: '#ffffff'
        }}>
        扫码登录
      </span>
      <div
        style={{
          width: 136,
          height: 136,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 8
        }}>
        <img style={{ width: 120, height: 120 }} src="https://mypsb.cn/qrCode.png" />
      </div>
      <span style={{ marginTop: 5, color: '#ffffff', fontSize: 14 }}>
        请使用<span style={{ color: '#38ADFF' }}>手机票税宝</span>扫码
      </span>
      <div
        style={{
          height: 28,
          display: 'flex',
          alignItems: 'center',
          padding: '0 25px',
          border: '1px solid #ffffff',
          borderRadius: 14,
          marginTop: 7,
          color: '#ffffff',
          fontSize: 12
        }}>
        <span>点击下载手机票税宝</span>
      </div>
    </div>
  )
}

export default ScanLogin
