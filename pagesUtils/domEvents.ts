export const addEventListener = (element, type, fun) => {
  if (element.addEventListener) {
    // console.log(3, element, type)
    element.addEventListener(type, fun, false)
  } else if (element.attachEvent) {
    element.attachEvent(`on${type}`, fun)
  } else {
    element[`on${type}`] = fun
  }
}

export const removeEventListener = (element, type, handler) => {
  if (element.removeEventListener) {
    element.removeEventListener(type, handler)
  } else if (element.deattachEvent) {
    element.deattachEvent(`on${type}`, handler)
  } else {
    element[`on${type}`] = null
  }
}
