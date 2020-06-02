import Link from 'next/link'

type Props = {
  registerAddr: string
  isPc?: boolean
}

const LoginFooter = ({ isPc = false, registerAddr }: Props) => {
  const resetPwdHref = `${isPc ? '/resetpwd?isPc=6' : '/resetpwd'}`
  const hasParams = registerAddr.includes('?')
  const registerHref = `${
    isPc ? `${registerAddr}${hasParams ? '&isPc=6`' : '?isPc=6'}` : registerAddr
  }`
  return (
    <div
      style={{
        marginTop: 12,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 12
      }}>
      <Link href={resetPwdHref}>
        <a style={{ cursor: 'pointer', color: '#ffffff' }}>忘记密码？</a>
      </Link>
      <Link href={registerHref}>
        <span style={{ cursor: 'pointer', color: '#38ADFF' }}>免费注册</span>
      </Link>
    </div>
  )
}

export default LoginFooter
