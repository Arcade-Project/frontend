import userReducer from './userReducer'
import authReducer from './authReducer'
import appReducer from './appReducer'
import { combineReducers} from 'redux'

const allReducers = combineReducers({
    user: userReducer,
    auth: authReducer,
    app: appReducer,
})

export default allReducers