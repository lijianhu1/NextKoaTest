
/**
 * 防抖
 * @param {*} fn 回调
 * @param {*} wait 等待时间
 */
export const debounceFn = (fn, wait = 200) => {
  let timeOut = null
  let self = this
  return (...args) => {
    if (timeOut) {
      clearTimeout(timeOut)
    }
    timeOut = setTimeout(() => {
      fn.apply(self, args)
    }, wait)
  }
}

export const throttleFn = function(fn, delayTime = 500) {
  let pre = new Date(),
    timer = null
  return function() {
    let args = arguments
    let self = this
    let now = new Date()
    let res: number = Math.abs(now.getTime() - pre.getTime())
    if (res >= delayTime) {
      if (timer) {
        clearTimeout(timer)
      }
      fn.apply(self, args)
      pre = now
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(self, args)
          pre = new Date()
        }, delayTime)
      }
    }
  }
}