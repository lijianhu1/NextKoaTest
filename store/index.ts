import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from './reducers/auth'
import {
  userBindingEnterpriseReducer,
  industryTypeReducer,
  staffSizeReducer
} from './reducers/enterprise'
import userReducer from './reducers/user'
import loadingReducer from './reducers/loading'

const allReducers = combineReducers({
  loadingInfo: loadingReducer,
  authInfo: authReducer,
  userInfo: userReducer,
  userBindingEnterprises: userBindingEnterpriseReducer,
  enterpriseIndustryTypes: industryTypeReducer,
  enterpriseStaffSizes: staffSizeReducer
})

export default state => {
  const store = createStore(
    allReducers,
    Object.assign({}, state),
    composeWithDevTools(applyMiddleware(ReduxThunk))
  )
  return store
}
