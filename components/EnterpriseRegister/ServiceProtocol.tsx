import { useState, useEffect, useCallback } from 'react'
import { Checkbox } from 'antd'
import { EnterpriseRegisterFormProps } from '../../types/EnterpriseTypes'
type serviceProtocolModel = {
  errMsg: string
}
const ServiceProtocol = ({
  compDataChanged
}: EnterpriseRegisterFormProps<serviceProtocolModel>) => {
  const [isSelected, setIsSelected] = useState(true)
  const onChanged = useCallback(
    e => {
      setIsSelected(e.target.checked)
    },
    [isSelected]
  )

  useEffect(() => {
    compDataChanged({errMsg: !isSelected ? '请同意票税宝服务协议' : '' })
  }, [isSelected])

  const open = () => {
    window.open('/static/pdf/票税宝企业服务协议.pdf')
  }
  return (
    <div style={{ marginTop: 30 }}>
      <Checkbox onChange={onChanged} checked={isSelected} />
      <span style={{ marginLeft: 20, color: '#333333' }}>我同意并遵守</span>
      <span style={{ color: '#24a5f1', cursor: 'pointer' }} onClick={open}>
        《票税宝企业服务协议》
      </span>
    </div>
  )
}

export default ServiceProtocol
