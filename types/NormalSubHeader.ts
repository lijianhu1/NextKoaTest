export interface NormalSubMenuItem {
  path: string
  name: string
  isNotLink?: boolean
  mouseEnterEvent?: () => void
  mouseLeaveEvent?: () => void
}
export interface NormalSubHeaderProps {
  backgroundColor?: string
  styleMode: number
  activePath?: string
  menuItems?: NormalSubMenuItem[]
  loginRouter?: string
  registerRouter?: string
}

export interface NormalSubHeaderLoginProps {
  loginStyle?: number
  showLoginBtn?: boolean
  loginSuccessTitle?: string
  enterBackgroundMgrBefore?: () => void
}
