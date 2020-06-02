import { useState, useEffect, useCallback, useRef } from 'react'
import { Button } from 'antd'
import './index.less'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userAction from '../../store/actions/userAction'
import LoginBasic from '../../components/LoginBasic'
import PersonalComp from '../../components/PersonalComp'
const { throttleFn } = require('../../lib/debounceThrottleHelper')
import { ILoginBasicsProps } from '../../types/LoginTypes'
import { PersonalSite } from '../../config/constantData'
import PersonalConfig from '../../constant/PersonalConfig'
import Router from 'next/router'
import * as DomEvents from '../../pagesUtils/domEvents'
import StorageUtils from '../../lib/storageUtils'

const bgConfig = PersonalConfig.bgConfig
const contentConfig = PersonalConfig.bgContentConfig

const Personal = ({ authInfo, userInfo, loginPersonalAccount }) => {
  let pageRef = useRef()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [swiperWrapperHeight, setSwiperWrapperHeight] = useState(0)
  const [showLoginBtn, setShowLoginBtn] = useState(false)
  const [swiperSlideArr, setSwiperSlideArr] = useState([])
  const [curIndex, setCurIndex] = useState(0)
  const [moveHeight, setMoveHeight] = useState(0)
  const [wheelState, setWheelState] = useState(0)
  const [pagination, setPagination] = useState([])
  const [needRepaint, setNeedRepaint] = useState(true)

  useEffect(() => {
    initData()
    initPagination()
    if (navigator.userAgent.includes('Firefox')) {
      DomEvents.addEventListener(pageRef.current, 'DOMMouseScroll', handler)
    } else {
      DomEvents.addEventListener(pageRef.current, 'mousewheel', handler)
    }
    return () => {
      if (navigator.userAgent.includes('Firefox')) {
        DomEvents.removeEventListener(
          pageRef.current,
          'DOMMouseScroll',
          handler
        )
      } else {
        DomEvents.removeEventListener(pageRef.current, 'mousewheel', handler)
      }
    }
  }, [])

  useEffect(() => {
    if (!userInfo.UserId) {
      setNeedRepaint(false)
      setTimeout(() => {
        setNeedRepaint(true)
      }, 100)
    }
  }, [userInfo])

  const initPagination = useCallback(() => {
    let arr = []
    for (let index = 0; index < bgConfig.length; index++) {
      arr.push(index)
    }
    setPagination(arr)
  }, [])

  const initData = useCallback(() => {
    let clientHeight = document.documentElement.clientHeight
    let clientWidth = document.documentElement.clientWidth
    let actualHeight = clientHeight - 80 - 97
    let sliderStyle = {
      position: 'relative',
      overflow: 'hidden',
      width: clientWidth,
      height: actualHeight,
      backgroundImage: '',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }
    let arr = []
    for (let index = 0; index < bgConfig.length; index++) {
      let style = Object.assign({}, sliderStyle, {
        backgroundImage: `url(${bgConfig[index]})`
      })
      let titleImgStyle = { position: 'relative' }
      switch (index) {
        case 0:
          titleImgStyle = Object.assign({}, titleImgStyle, {
            left: '41%',
            marginBottom: 20
          })
          break
        case 1:
          titleImgStyle = Object.assign({}, titleImgStyle, {
            left: '-61%',
            marginBottom: 20
          })
          break
        case 2:
          titleImgStyle = Object.assign({}, titleImgStyle, {
            left: '45%',
            marginBottom: 166
          })
          break
        case 3:
        case 4:
          titleImgStyle = Object.assign({}, titleImgStyle, {
            left: '-100%',
            marginBottom: 166
          })
          break
      }
      arr.push({
        style,
        titleImgStyle,
        content: contentConfig[index]
      })
    }
    setSwiperWrapperHeight(actualHeight)
    setSwiperSlideArr(arr)
  }, [])

  useEffect(
    throttleFn(() => {
      if (wheelState !== 0 && curIndex >= 0 && curIndex < bgConfig.length) {
        // console.log(81, wheelState, curIndex)
        let newIndex = curIndex
        if (wheelState > 0) {
          newIndex = newIndex < bgConfig.length - 1 ? (newIndex += 1) : newIndex
          // console.log(`向下移动${swiperWrapperHeight * newIndex}`)
          setMoveHeight(swiperWrapperHeight * newIndex)
        } else {
          newIndex = newIndex > 0 ? (newIndex -= 1) : 0
          // console.log(`${curIndex}向上移动${swiperWrapperHeight * newIndex}`)
          setMoveHeight(swiperWrapperHeight * newIndex)
        }
        setWheelState(0)
        setCurIndex(newIndex)
      }
    }),
    [wheelState, curIndex]
  )

  useEffect(() => {
    setShowLoginBtn(curIndex > 0)
  }, [curIndex])

  const handler = useCallback(e => {
    if (e.detail > 0 || e.wheelDelta < 0) {
      //向下
      setWheelState(1)
    } else {
      //向上
      setWheelState(-1)
    }
  }, [])

  const loginOption: ILoginBasicsProps = {
    showMask: true,
    registerAddr: '/register/personal',
    /* customHeader: () => {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 20,
            paddingBottom: 15
          }}>
          <span
            style={{
              fontSize: 18,
              color: '#ffffff'
            }}>
            登录票税宝
          </span>
        </div>
      )
    }, */
    customLoginAction: data => {
      loginPersonalAccount({
        data,
        success: res => {
          setShowLoginDialog(false)
          enterBgMgrBefore(res.Token)
        }
      })
    },
    loginSuccess(res){
      setShowLoginDialog(false)
      enterBgMgrBefore(res.Token)
    },
    closeDialog: () => {
      setShowLoginDialog(false)
    }
  }
  const enterBgMgrBefore = useCallback((token?) => {
    StorageUtils.setAuthInfo({
      Token: authInfo.token || token
    })
    setTimeout(() => {
      location.replace(`${PersonalSite}`)
    }, 300)
  }, [])
  const quickLogin = useCallback(() => {
    setShowLoginDialog(true)
  }, [])

  const quickRegister = useCallback(() => {
    Router.push('/register/personal')
  }, [])

  return (
    <>
      <div
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
        {showLoginDialog ? <LoginBasic loginOption={loginOption} /> : null}
      </div>
      <PersonalComp
        activePath={'personal'}
        showLoginBtn={authInfo.token != undefined}
        enterBackgroundMgrBefore={enterBgMgrBefore}
      />
      <div ref={pageRef}>
        {needRepaint ? (
          <div
            className="swiper-container"
            style={{ height: swiperWrapperHeight, overflow: 'hidden' }}>
            <div
              className="swiper-wrapper"
              style={{
                width: '100%',
                height: swiperWrapperHeight * bgConfig.length,
                transition: 'transform .3s ease',
                transform: `translateY(-${moveHeight}px)`
              }}>
              {swiperSlideArr.map((item, index) => {
                return (
                  <div key={index} className="swiper-slide" style={item.style}>
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%,-50%)'
                      }}>
                      <img style={item.titleImgStyle} src={item.content} />
                      {showLoginBtn || userInfo.UserId ? null : (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100vw'
                          }}>
                          <Button
                            style={{
                              width: 158,
                              height: 30,
                              backgroundColor: '#ffffff',
                              color: '#0096f0'
                            }}
                            onClick={quickLogin}>
                            登录
                          </Button>
                          <Button
                            style={{
                              marginLeft: 20,
                              width: 158,
                              height: 30,
                              backgroundColor: 'transparent',
                              color: '#ffffff'
                            }}
                            onClick={quickRegister}>
                            立即注册
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <div
              className="swiper-pagination"
              style={{
                position: 'fixed',
                right: 10,
                top: '50%',
                marginTop: -67
              }}>
              {pagination.map(item => {
                return (
                  <i
                    style={{
                      display: 'block',
                      width: 15,
                      height: 15,
                      borderRadius: '50%',
                      marginBottom: 15,
                      border: '1px solid #ccc',
                      backgroundColor: curIndex === item ? '#ffffff' : ''
                    }}
                    key={item}
                  />
                )
              })}
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
export default connect(
  state => state,
  dispatch => bindActionCreators(userAction, dispatch)
)(Personal)
