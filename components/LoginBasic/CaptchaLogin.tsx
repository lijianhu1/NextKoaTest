import { useCallback } from 'react'
import MobilePhoneComp from '../Base/MobilePhoeComp'
import SmsComp from '../SmsComp'
type Props = {
  MobilePhone: string
  mobilePhoneChanged: (value: string) => void
  captchaCodeChanged: (value: string) => void
  captchaErrorCallBack: (errMsg: string) => void
  tokeyDown: (e: any) => void
}
const CaptchaLogin = ({
  MobilePhone,
  mobilePhoneChanged,
  captchaCodeChanged,
  captchaErrorCallBack,
  tokeyDown
}: Props) => {
  const phoneChanged = useCallback(
    value => {
      mobilePhoneChanged(value)
    },
    [mobilePhoneChanged]
  )
  return (
    <>
      <MobilePhoneComp MobilePhone={MobilePhone} valueChanged={phoneChanged} />
      <div style={{ marginTop: 10 }}>
        <SmsComp
          flagType={0}
          mobilePhone={MobilePhone}
          errorCallBack={captchaErrorCallBack}
          captchaCodeChanged={captchaCodeChanged}
          keyDown = {tokeyDown}
        />
      </div>
    </>
  )
}
export default CaptchaLogin
