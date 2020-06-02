import { useState, useEffect, useCallback } from 'react'
import NormalSubHeader from '../../components/NormalSubHeader'
import { NormalSubHeaderProps } from '../../types/NormalSubHeader'
import ProductConfig from '../../constant/ProductConfig'
import { withRouter } from 'next/router'
const Product = ({ router }) => {
  const [config, setConfig] = useState([])
  const [contentConfig, setContentConfig] = useState([])
  const [showMask, setShowMask] = useState(false)
  const [curTitle, setCurTitle] = useState('')
  const normalSubHeaderProps: NormalSubHeaderProps = {
    styleMode: 1,
    activePath: 'product',
    menuItems: config
  }

  const mouseEnterEvent = useCallback(() => {
    setShowMask(true)
  }, [])
  const mouseLeaveEvent = useCallback(() => {
    setShowMask(false)
  }, [])

  useEffect(() => {
    let oldConfig = ProductConfig.menuItems
    let temp = oldConfig.find(item => item.isNotLink)
    if (temp) {
      temp = Object.assign({}, temp, { mouseEnterEvent, mouseLeaveEvent })
      oldConfig.splice(1, 1, temp)
      setConfig(oldConfig)
    }
  }, [])

  useEffect(() => {
    let id = router.query.id
    findContentConfig(id)
  }, [])

  const findContentConfig = useCallback(id => {
    let config = ProductConfig.contentConfig.find(item => item.id == id)
    setCurTitle(config.title)
    setContentConfig(config.content)
  }, [])

  const maskItemClick = useCallback(id => {
    findContentConfig(id)
  }, [])

  return (
    <>
      <NormalSubHeader normalSubHeaderProps={normalSubHeaderProps} />
      {showMask ? (
        <MaskComp
          click={maskItemClick}
          title={curTitle}
          mouseEnterEvent={mouseEnterEvent}
          mouseLeaveEvent={mouseLeaveEvent}
        />
      ) : null}
      <div>
        {contentConfig.map((item, index) => {
          return <img style={{ width: '100%' }} key={index} src={item} />
        })}
      </div>
    </>
  )
}

interface MaskCompProps {
  title: string
  mouseEnterEvent: () => void
  mouseLeaveEvent: () => void
  click: (title: number) => void
}

const MaskComp = (props: MaskCompProps) => {
  const itemClick = useCallback(e => {
    props.click(e.currentTarget.dataset.id)
  }, [])
  return (
    <div
      style={{
        position: 'absolute',
        top: 73,
        left: 0,
        right: 0,
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9f6fd'
      }}
      onMouseEnter={props.mouseEnterEvent}
      onMouseLeave={props.mouseLeaveEvent}>
      {ProductConfig.contentConfig.map(item => {
        return (
          <span
            style={{
              cursor: 'pointer',
              marginRight: 80,
              fontSize: 16,
              color: props.title === item.title ? '#0596f3' : '#333333'
            }}
            key={item.id}
            data-id={item.id}
            onClick={itemClick}>
            {item.title}
          </span>
        )
      })}
    </div>
  )
}

export default withRouter(Product)
