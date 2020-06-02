import * as ActionTypes from '../actionTypes'

export default (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.SET_AUTHINFO:
      if (action.authInfo) {
        return Object.assign({}, state, action.authInfo)
      } else {
        return {}
      }
    default:
      return state
  }
}
