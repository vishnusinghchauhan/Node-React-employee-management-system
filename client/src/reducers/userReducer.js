const initialState = {
	userInfo:{} ,
}
const userReducer = (currentState = initialState, action) => {
	console.log("actionactionaction",action)
    switch (action.type) {
    	case 'LOGIN_USER_INFO':
	  	return {
	  		...currentState, userInfo:action.payload
	  	};
        default:
            return currentState
    }
}
export default userReducer;