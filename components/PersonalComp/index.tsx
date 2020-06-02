import NormalSubHeader from '../NormalSubHeader'
import {
  NormalSubHeaderProps,
  NormalSubHeaderLoginProps
} from '../../types/NormalSubHeader'
import PersonalConfig from '../../constant/PersonalConfig'

interface CompProps {
  activePath: string
  showLoginBtn: boolean
  enterBackgroundMgrBefore?: () => void
}
const PersonalComp = ({
  activePath,
  showLoginBtn = false,
  enterBackgroundMgrBefore
}: CompProps) => {
  let loginProps: NormalSubHeaderLoginProps = {
    showLoginBtn: showLoginBtn,
    enterBackgroundMgrBefore,
    loginSuccessTitle: '进入我的票税宝'
  }
  const normalSubHeaderProps: NormalSubHeaderProps = {
    styleMode: 1,
    activePath: activePath,
    menuItems: PersonalConfig.menuItems
  }
  return (
    <NormalSubHeader
      normalSubHeaderProps={normalSubHeaderProps}
      normalSubHeaderLoginProps={loginProps}
    />
  )
}

export default PersonalComp
