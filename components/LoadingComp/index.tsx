import { Spin } from 'antd'
import MaskComp from '../MaskComp'
import { connect } from 'react-redux'
const LoadingComp = ({ loadingInfo }) => {
  return (
    <>
      {loadingInfo.show ? (
        <>
          <MaskComp opacity={0} />
          <Spin
            tip={loadingInfo.tip}
            delay={100}
            size="large"
            style={{
              position: 'absolute',
              zIndex: 600,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)'
            }}
          />
        </>
      ) : null}
    </>
  )
}

export default connect(state => state)(LoadingComp)
