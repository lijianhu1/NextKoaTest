import { useState, useCallback, useEffect } from 'react'
import { Modal, Button, Input } from 'antd'
import { CaptchaCompProps } from '../../types/SmsTypes'
const { CreateCaptchaImage } = require('../../lib/interface')

const ModalContentStyle = {
  height: 50,
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center'
}

const CaptchaComp = (props: CaptchaCompProps) => {
  const { captchaImg, visible, cancel, success } = props
  const [oldCaptchaImg, setCaptchaImage] = useState(captchaImg)
  const [captchaInput, setCaptchaInput] = useState('')
  const [isCreateNewCaptcha, setCaptchaFlag] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  useEffect(() => {
    if (!isCreateNewCaptcha) {
      if (oldCaptchaImg !== captchaImg) {
        setErrMsg('验证码输入错误')
        //设置新的验证码
        setCaptchaInput('')
        setCaptchaImage(captchaImg)
      }
    }
  }, [isCreateNewCaptcha, oldCaptchaImg, captchaImg])

  const graphCodeInputChanged = useCallback(
    e => {
      setErrMsg('')
      setCaptchaInput(e.target.value)
    },
    [captchaInput]
  )
  /**
   * 验证码输入完成回调
   */
  const graphCodeSure = useCallback(async () => {
    if (!captchaInput) {
      setErrMsg('请输入验证码')
      return
    }
    await success(captchaInput, () => {
      setCaptchaFlag(false)
    })
    // setCaptchaFlag(false)
  }, [captchaInput])
  /**
   * 取消验证码输入
   */
  const cancelCaptcha = useCallback(() => {
    cancel()
    setCaptchaFlag(false)
  }, [])

  /**
   * 点击验证码图片获取新的验证码
   */
  const getGraphCodeImage = useCallback(async () => {
    setCaptchaFlag(true)
    const res = await CreateCaptchaImage()
    if (res.ResCode === 1000) {
      setCaptchaImage(res.Image)
    }
  }, [])

  return (
    <div className="root">
      <Modal
        width="300"
        title="安全验证"
        centered
        visible={visible}
        onCancel={cancelCaptcha}
        footer={
          <Button type="primary" size="default" onClick={graphCodeSure}>
            确定
          </Button>
        }>
        <div className="modal-content" style={ModalContentStyle}>
          <Input
            placeholder="请输入验证码"
            value={captchaInput}
            onChange={graphCodeInputChanged}
          />
          <img
            style={{ width: 160, marginLeft: 33 }}
            src={oldCaptchaImg}
            onClick={getGraphCodeImage}
          />
        </div>
        {
          <div
            style={{
              height: 20,
              paddingTop: 10,
              textAlign: 'center',
              color: '#ff0000'
            }}>
            {errMsg}
          </div>
        }
      </Modal>
      <style jsx>{`
        .graphCode-img {
        }
      `}</style>
      <style jsx global>{`
        .ant-modal-footer > div {
          display: flex;
          justify-content: flex-end;
        }
        .ant-modal-footer > button {
          width: 60px;
        }
      `}</style>
    </div>
  )
}

export default CaptchaComp
