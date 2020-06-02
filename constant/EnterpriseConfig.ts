import ThirdSitePath from './ThirdSitePath'
import { verifyIsChinese, verifyMobilePhone } from '../lib/util'
//企业注册表单错误配置表
export const RegisterFormErrorConfig = {
  EnterpriseName: '请填写企业、政府或组织名称',
  StaffSize: '请选择人员规模',
  IndustryCode: '请选择行业类型',
  Administrator: '请填写企业管理员的姓名',
  MobilePhone: {
    fn: value => {
      return verifyMobilePhone(value)
    }
  },
  CaptchaCode: '请输入手机短信收到的6位验证码',
  Password: {
    fn: pwd => {
      if (!pwd || pwd.length < 6 || pwd.length > 30 || verifyIsChinese(pwd)) {
        return '请输入6-30个非汉字密码'
      }
      return ''
    }
  }
}
export default {
  SubTileConfig: [
    { path: 'platformIntroduce', name: '平台简介' },
    { path: 'financial', name: '企业票夹（模式）' },
    { path: 'enterprise', name: '企业电子报销（模式）' }
  ],
  //平台简介
  IntroduceContentConfig: [
    {
      src: 'static/images/enterprise/btn_admin_normal.png',
      title: '发票管理',
      subTitle: '精细化发票分类管理，支持 批量管票、模糊搜索'
    },
    {
      src: 'static/images/enterprise/btn_statistics_normal.png',
      title: '发票统计',
      subTitle: '发票流水分类统计，月支出 架构清晰可视'
    },
    {
      src: 'static/images/enterprise/btn_filtrate_normal.png',
      title: '发票去重',
      subTitle: '一键筛选重复发票，避免 多次报销'
    },
    {
      src: 'static/images/enterprise/btn_account_normal.png',
      title: '国家会计电子档案法',
      subTitle: '电子凭证、电子账簿、电子报表、其他电子会计核算资料等'
    },
    {
      src: 'static/images/enterprise/btn_authenticate_normal.png',
      title: '发票鉴伪',
      subTitle: '只能发票审查，快速鉴别异常发票'
    },
    {
      src: 'static/images/enterprise/btn_private_cloud_normal.png',
      title: '私有云',
      subTitle: '多重信息加密保障，严格风控确保数据安全'
    }
  ],
  //企业票夹模式
  EnterpriseFolder: [
    {
      title: '财务录票',
      src: 'static/images/enterprise/folder/caiwulupiaoa.png'
    },
    {
      title: '员工发票',
      src: 'static/images/enterprise/folder/yuangongfapiao.png'
    },
    {
      title: '发票鉴伪查重',
      src: 'static/images/enterprise/folder/fapiaojianweichachong.png'
    },
    {
      title: '发票打印',
      src: 'static/images/enterprise/folder/fapiaodayin.png'
    },
    {
      title: '财税机构协作',
      src: 'static/images/enterprise/folder/caishuijigouxiezuo.png'
    },
    {
      title: '交通费抵扣',
      src: 'static/images/enterprise/folder/jiaotongfeidikou.png'
    }
  ],
  //企业票夹模式
  EnterpriseFolderDesc: [
    {
      name: '企业发票统一管理',
      items: [
        {
          src: 'static/images/enterprise/folder/gaoxiaochulidianzifapiao.png',
          activeSrc: 'static/images/enterprise/folder/gaoxiaochulidianzifapiao_active.png',
          title: '高效处理电子发票',
          hover: false
        },
        {
          src: 'static/images/enterprise/folder/OCR.png',
          activeSrc: 'static/images/enterprise/folder/OCR_active.png',
          title: '纸质发票OCR',
          hover: false
        },
        {
          src: 'static/images/enterprise/folder/jianweichachong.png',
          activeSrc: 'static/images/enterprise/folder/jianweichachong_active.png',
          title: '鉴伪查重',
          hover: false
        },
        {
          src: 'static/images/enterprise/folder/yuangongfapiaoguanli.png',
          activeSrc: 'static/images/enterprise/folder/yuangongfapiaoguanli_active.png',
          title: '员工发票管理',
          hover: false
        }
      ]
    },
    {
      name: '企业与财税机构协作更方便',
      items: [
        {
          src: 'static/images/enterprise/folder/yijianchuanpiao.png',
          activeSrc: 'static/images/enterprise/folder/yijianchuanpiao_active.png',
          title: '一键传票',
          hover: false
        },
        {
          src: 'static/images/enterprise/folder/xiaoxihutong.png',
          activeSrc: 'static/images/enterprise/folder/xiaoxihutong_active.png',
          title: '消息互通',
          hover: false
        },
        {
          src: 'static/images/enterprise/folder/caishuixiezuo.png',
          activeSrc: 'static/images/enterprise/folder/caishuixiezuo_active.png',
          title: '财税协作',
          hover: false
        },
        {
          src: 'static/images/enterprise/folder/shuifeidikou.png',
          activeSrc: 'static/images/enterprise/folder/shuifeidikou_active.png',
          title: '税费抵扣',
          hover: false
        }
      ]
    }
  ],
  //平台服务商
  EnterprisePlatforms: [
    {
      src: 'static/images/enterprise/wechat.png',
      title: '企业微信'
    },
    {
      src: 'static/images/enterprise/dingding.png',
      title: '钉钉'
    }
  ],
  //电子报销和OA服务商
  EnterpriseOAServices: [
    {
      href: ThirdSitePath.yanhuangHref,
      src: 'static/images/enterprise/OA/yanhuang.png',
      title: '炎黄盈动',
      subTitle: 'BPM业务流程管理软件和企业PaaS服务提供商'
    },
    {
      href: ThirdSitePath.zhongruanHref,
      src: 'static/images/enterprise/OA/zhongruan.png',
      title: '中软',
      subTitle: '国内领先的大型综合性软件与信息服务企业'
    },
    {
      href: ThirdSitePath.jinhuaHref,
      src: 'static/images/enterprise/OA/jinghua.png',
      title: '京华',
      subTitle: '优质的软件产品与解决方案及信息化全过程服务'
    },
    {
      href: ThirdSitePath.pingaoHref,
      src: 'static/images/enterprise/OA/pingao.png',
      title: '品高',
      subTitle: '企业云计算专家'
    }
  ]
}
