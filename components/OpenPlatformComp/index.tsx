import NormalSubHeader from '../NormalSubHeader'
import { NormalSubHeaderProps, NormalSubHeaderLoginProps } from '../../types/NormalSubHeader'
import OpenPlatformConfig from '../../constant/OpenPlatformConfig'

const normalLoginProps: NormalSubHeaderLoginProps = {
  showLoginBtn: false
}
export interface Props {
  activePath: string
}
const OpenPlatformComp = ({ activePath }: Props) => {
  const normalSubHeader: NormalSubHeaderProps = {
    styleMode: 1,
    activePath: activePath,
    backgroundColor: '#fbfafa',
    menuItems: OpenPlatformConfig.SubTitleConfig
  }
  return (
    <>
      <NormalSubHeader
        normalSubHeaderProps={normalSubHeader}
        normalSubHeaderLoginProps={normalLoginProps}
      />
    </>
  )
}

export default OpenPlatformComp
