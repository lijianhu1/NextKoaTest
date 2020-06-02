import * as ActionTypes from '../actionTypes'

export default (state = { show: false, tip: '' }, action) => {
  switch (action.type) {
    case ActionTypes.MODIFY_LOADING_STATUS:
      return { ...state, show: action.tip && action.tip.length > 0, tip: action.tip }
    default:
      return state
  }
}
