import * as ActionTypes from '../actionTypes'

export const modifyLoadingStatus = tip => ({
  type: ActionTypes.MODIFY_LOADING_STATUS,
  tip: tip
})
