import { combineReducers } from 'redux'
import login from "./loginReducer";
import user from "./userReducer";


const rootReducer = combineReducers({  
	login: login,
	user:user
})

export default rootReducer