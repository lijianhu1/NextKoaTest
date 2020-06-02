import * as ActionTypes from '../actionTypes'

const userBindingEnterpriseReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_USER_BINDING_ENTERPRISES:
      return [...action.enterprises]
    default:
      return state
  }
}

const industryTypeReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_INDUSTRY_TYPES:
      return [...action.industryTypes]
    default:
      return state
  }
}
const staffSizeReducer = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.SET_STAFF_SIZE:
      return [...action.staffSize]
    default:
      return state
  }
}

export { userBindingEnterpriseReducer, industryTypeReducer, staffSizeReducer }
