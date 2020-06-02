import * as ActionTypes from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_USERINFO:
      if (action.userInfo) {
        return Object.assign({}, state, action.userInfo)
      } else {
        return {}
      }
    default:
      return state
  }
}
