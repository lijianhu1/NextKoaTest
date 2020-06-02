import NormalSubHeader from '../NormalSubHeader'
import { NormalSubHeaderProps, NormalSubHeaderLoginProps } from '../../types/NormalSubHeader'
import EnterpriseConfig from '../../constant/EnterpriseConfig'

export interface Props {
  activePath: string
  loginRouter?: string
  loginSuccessTitle?: string
  enterBackgroundMgrBefore?: () => void
  registerRouter?: string
}
const EnterpriseComp = ({
  activePath,
  loginRouter = null,
  loginSuccessTitle,
  enterBackgroundMgrBefore,
  registerRouter = ''
}: Props) => {
  const normalSubHeader: NormalSubHeaderProps = {
    styleMode: 2,
    activePath: activePath,
    menuItems: EnterpriseConfig.SubTileConfig,
    loginRouter,
    registerRouter
  }
  const normalLoginProps: NormalSubHeaderLoginProps = {
    loginSuccessTitle,
    enterBackgroundMgrBefore,
    showLoginBtn: loginRouter !== null
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

export default EnterpriseComp
