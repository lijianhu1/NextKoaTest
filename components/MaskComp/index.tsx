const MaskComp = ({ opacity = 0.6 }) => {
  return (
    <div
      style={{
        zIndex: 100,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: `rgba(0,0,0,${opacity})`
      }}
    />
  )
}

export default MaskComp
