import { useCallback } from 'react'
import { Input, Icon } from 'antd'
type Props = {
  hasPreFix?: boolean
  MobilePhone: string
  valueChanged: (value: string) => void
}
const MobilePhoneComp = ({ hasPreFix = true, MobilePhone, valueChanged }: Props) => {
  const mobilePhoneChanged = useCallback(
    e => {
      let value = e.target.value.slice(0, 11)
      valueChanged(value)
    },
    [valueChanged]
  )
  return (
    <Input
      type="number"
      style={{ height: 40 }}
      value={MobilePhone}
      prefix={hasPreFix ? <Icon type="user" /> : ''}
      placeholder="请输入手机号"
      autoComplete="off"
      allowClear={true}
      onChange={mobilePhoneChanged}
    />
  )
}

export default MobilePhoneComp
