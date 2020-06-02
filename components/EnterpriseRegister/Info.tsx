import { Row, Col, Cascader, Select, Input, message } from 'antd'
const { Option } = Select
import React, { useEffect, useCallback, useState, useRef } from 'react'
import { connect } from 'react-redux'
import { setIndustryType, setStaffSize } from '../../store/actions/enterpriseAction'
import * as Api from '../../lib/interface'
import { debounceFn } from '../../lib/debounceThrottleHelper'
import { EnterpriseRegisterFormProps } from '../../types/EnterpriseTypes'
import { generateSecAfter } from '../../pagesUtils/loginBasicUtil'
import * as DomEvents from '../../pagesUtils/domEvents'
//企业类型
const INDUSTRYTYPES = 'enterpriseIndustryCode'
//企业规模
const STAFFSIZE = 'enterpriseStaffSize'
interface ICascaderProps {
  label: string
  value: string
  children: ICascaderProps[]
}
type staffSizeProps = {
  Key: string
  Value: string
}
type EnterpriseInfoType = {
  EnterpriseName: string
  IndustryCode: string
  StaffSize: string
}
type InfoProps = {
  /**
   * 是否是财税机构
   */
  isAgency: boolean
  industryTypesFromState: []
  staffSizeFromState: staffSizeProps[]
  setIndustryTypes: ([]) => void
  setStaffSize: ([]) => void
  regFormProps: EnterpriseRegisterFormProps<EnterpriseInfoType>
}

const getInvoiceTitles = async (searchValue, cb) => {
  let secData = await generateSecAfter()
  if (!secData) {
    message.error('数据加密异常...')
    return null
  }
  let res = await Api.SearchInvoiceTitles({
    PartialName: searchValue,
    Protection: secData
  })
  if (res.ResCode === 1000) {
    //去重
    let m = res.Items.reduce((pre, cur) => {
      if (pre.findIndex(item => item.Name === cur.Name) < 0) {
        pre.push(cur)
      }
      return pre
    }, [])
    // console.log(m)
    cb && cb(m)
    return m
  }
  return []
}

const searchInvoiceTitleDebounceFn = debounceFn(getInvoiceTitles, 500)
let enterpriseModel: EnterpriseInfoType = {
  EnterpriseName: '',
  IndustryCode: '',
  StaffSize: ''
}
const Info = (props: InfoProps) => {
  const {
    isAgency = false,
    industryTypesFromState,
    staffSizeFromState,
    setIndustryTypes,
    setStaffSize,
    regFormProps
  } = props
  const { compDataChanged, title, enterpriseName } = regFormProps
  const [iduTypes, setIduTypes] = useState<Array<ICascaderProps>>([])
  const [enterpriseList, setEnterpriseList] = useState([])
  const [enterpriseInfo, setEnterpriseInfo] = useState(enterpriseModel)
  const enterpriseListPop = useRef<HTMLDivElement>()

  useEffect(() => {
    setEnterpriseInfo(Object.assign({}, enterpriseInfo, { EnterpriseName: enterpriseName }))
  }, [])

  useEffect(() => {
    if (industryTypesFromState.length <= 0 || staffSizeFromState.length <= 0) {
      getEnterpriseConfig()
    }
  }, [])

  useEffect(() => {
    let handler = e => {
      if (!enterpriseListPop.current.contains(e.target)) {
        setEnterpriseList([])
      }
    }
    let body = document.getElementById('__next')
    if (enterpriseList.length) {
      DomEvents.addEventListener(body, 'click', handler)
    }
    return () => {
      DomEvents.removeEventListener(body, 'click', handler)
    }
  }, [enterpriseList])

  useEffect(() => {
    compDataChanged(enterpriseInfo)
  }, [enterpriseInfo])

  useEffect(() => {
    let newVal = [...industryTypesFromState]
    if (newVal.length) {
      formatIndustryTypes(newVal)
      setIduTypes([...newVal])
    }
  }, [industryTypesFromState])

  const getEnterpriseConfig = useCallback(async () => {
    let iduType = { Childs: [] },
      staffSize = { Childs: [] }
    let res = await Api.GetClientConfig()
    if (res.ResCode === 1000) {
      iduType = res.Data.find(item => item.Key === INDUSTRYTYPES)
      staffSize = res.Data.find(item => item.Key === STAFFSIZE)
    }
    setIndustryTypes(iduType.Childs)
    setStaffSize(staffSize.Childs)
  }, [])

  const formatIndustryTypes = useCallback(types => {
    if (!Array.isArray(types) || types.length <= 0) {
      return []
    }
    // let temp = { key: '', value: '', label: '', children: [] }
    types.forEach(item => {
      item.key = item.Key
      item.value = item.Value
      item.label = item.Value
      item.children = item.Childs
      if (item.Childs) {
        formatIndustryTypes(item.Childs)
      }
    })
  }, [])

  const enterpriseNameChanged = useCallback(
    e => {
      let { value } = e.target
      setEnterpriseInfo(Object.assign({}, enterpriseInfo, { EnterpriseName: value }))
      searchInvoiceTitleDebounceFn(value, items => {
        setEnterpriseList(items)
      })
    },
    [enterpriseInfo]
  )

  const itemSelected = useCallback(
    e => {
      const { name } = e.target.dataset
      setEnterpriseInfo(Object.assign({}, enterpriseInfo, { EnterpriseName: name }))
      setEnterpriseList([])
    },
    [enterpriseInfo]
  )

  const iduTypesChanged = useCallback(
    ({}, selectedOptions) => {
      setEnterpriseInfo(
        Object.assign({}, enterpriseInfo, { IndustryCode: selectedOptions.pop().Key })
      )
    },
    [enterpriseInfo]
  )

  const staffSizeChanged = useCallback(
    value => {
      setEnterpriseInfo(Object.assign({}, enterpriseInfo, { StaffSize: value }))
    },
    [enterpriseInfo]
  )

  return (
    <>
      <p
        style={{
          color: '#333333',
          fontSize: 18,
          fontWeight: 700,
          textAlign: 'center'
        }}>
        {title ? title : isAgency ? '注册财税机构运营账号' : '注册企业账号'}
      </p>
      <p style={{ fontSize: 18, color: '#000000' }}>{isAgency ? '机构信息' : '企业信息'}</p>
      <Row type="flex" gutter={[0, 20]}>
        <Col span={24}>
          <Row type="flex" justify="space-between" align="middle">
            <Col xs={{ span: 5 }} sm={{ span: 4 }}>
              <span>{isAgency ? '机构名称' : '企业名称'}</span>
            </Col>
            <Col xs={{ span: 18 }} sm={{ span: 20 }}>
              <div>
                <Input
                  value={enterpriseInfo.EnterpriseName}
                  style={{ height: 36, width: '100%' }}
                  placeholder={isAgency ? '填写机构名称' : '填写企业、政府或组织名称'}
                  onChange={enterpriseNameChanged}
                />
                {enterpriseList.length > 0 ? (
                  <div
                    ref={enterpriseListPop}
                    style={{
                      position: 'absolute',
                      top: 45,
                      zIndex: 100,
                      backgroundColor: '#ffffff',
                      width: '100%',
                      borderRadius: 4,
                      paddingLeft: 10,
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
                    }}>
                    {enterpriseList.map(item => {
                      return (
                        <div
                          className="enterprise-item"
                          style={{ marginBottom: 2, cursor: 'pointer' }}
                          key={item.Name}
                          data-name={item.Name}
                          onClick={itemSelected}>
                          {item.Name}
                        </div>
                      )
                    })}
                  </div>
                ) : null}
              </div>
            </Col>
          </Row>
        </Col>
        {isAgency ? null : (
          <Col span={24}>
            <Row type="flex" justify="space-between" align="middle">
              <Col xs={{ span: 5 }} sm={{ span: 4 }}>
                <span>行业类型</span>
              </Col>
              <Col xs={{ span: 18 }} sm={{ span: 20 }}>
                <Cascader
                  style={{ width: '100%', height: 36 }}
                  placeholder="选择行业类型"
                  options={iduTypes}
                  expandTrigger="hover"
                  onChange={iduTypesChanged}
                />
              </Col>
            </Row>
          </Col>
        )}
        <Col span={24}>
          <Row type="flex" justify="space-between" align="middle">
            <Col xs={{ span: 5 }} sm={{ span: 4 }}>
              <span>人员规模</span>
            </Col>
            <Col xs={{ span: 18 }} sm={{ span: 20 }}>
              <Select
                placeholder="选择人员规模"
                style={{ height: 36, width: '100%' }}
                onChange={staffSizeChanged}>
                {staffSizeFromState.map(item => {
                  return <Option key={item.Key}>{item.Value}</Option>
                })}
              </Select>
            </Col>
          </Row>
        </Col>
      </Row>
      <style jsx>{`
        .enterprise-item:hover {
          background-color: #e6f7ff;
        }
      `}</style>
      <style jsx global>
        {`
          .ant-cascader-menu {
            min-width: 200px;
            height: 260px;
          }
        `}
      </style>
    </>
  )
}

export default connect(
  function mapStateToProps(state) {
    return {
      industryTypesFromState: state.enterpriseIndustryTypes,
      staffSizeFromState: state.enterpriseStaffSizes
    }
  },
  function mapDispatchToProps(dispatch) {
    return {
      setIndustryTypes: industryTypes => dispatch(setIndustryType(industryTypes)),
      setStaffSize: staffSize => dispatch(setStaffSize(staffSize))
    }
  }
)(Info)
