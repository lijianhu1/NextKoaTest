const isServer = typeof window === 'undefined'
let apiPath = ''
if (isServer) {
  apiPath = `${process.env.HOST}/api`
} else {
  let clientOrigin =
    location.origin.indexOf('localhost') > -1
      ? 'http://dev.mypsb.cn'
      : location.origin
  apiPath = `${process.env.HOST || clientOrigin}/api`
}
const version = 13
export const ZHANLANAUTHINFO = 'ZHANLANAUTHINFO'

export const _PSB_NEXT_REDUX_STORE = '_PSB_NEXT_REDUX_STORE'
/**
 * 企业票据中心
 */
export const BillcenterSite = `${apiPath}/web${version}/billcenter/index.html#/home`
/**
 * 进入选择企业列表
 */
export const SelectEnterpriseHref = `${apiPath}/web${version}/billcenter/index.html#/selectEnterprise`
/**
 * 财税机构代理添加客户
 */
export const AgencyCustomListSite = `${apiPath}/web${version}/billcenter/index.html#/financialIns/customList`
/**
 * 企业票夹网址
 */
export const EnterpriseFolderSite = `${apiPath}/web${version}/finanical/index.html#/inputmgr`

/**
 * 个人版网址
 */
export const PersonalSite = `${apiPath}/web${version}/site/psbweb/index.html#/invoiceList`

//是否显示顶部黑色的头部白名单
export const NoShowTopHeaderWhiteList = [
  '/',
  '/workAssistant',
  '/resetpwd',
  '/register/personal'
]

//企业票夹PC版下载地址
export const EnterpriseDownloadOrigin = `/api/web${version}/enterpriseFolder_msi`
