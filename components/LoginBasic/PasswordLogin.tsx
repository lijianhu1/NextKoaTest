import { Input, Icon } from 'antd'
import { IPasswordLoginModel } from '../../types/LoginTypes'
import MobilePhoneComp from '../Base/MobilePhoeComp'

type Props = {
  loginInfo: IPasswordLoginModel
  mobilePhoneChanged: (value: string) => void
  passwordChanged: (e: any) => void
  keyDown: (e: any) => void
}

const PasswordLogin = ({
  loginInfo,
  mobilePhoneChanged,
  passwordChanged,
  keyDown
}: Props) => {
  return (
    <>
      <MobilePhoneComp
        MobilePhone={loginInfo.MobilePhone}
        valueChanged={mobilePhoneChanged}
      />
      <Input.Password
        style={{ height: 40, marginTop: 10 }}
        value={loginInfo.Password}
        prefix={<Icon type="lock" />}
        placeholder="请输入密码"
        onChange={passwordChanged}
        onKeyDown = {keyDown}
      />
    </>
  )
}

export default PasswordLogin
