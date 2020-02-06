import axios from "axios";
import history from '../history'
import { userService } from "../services/authentication.service";
import { ToastContainer, toast } from 'react-toastify';


export const register = (regObj) => {
    console.log("register action", regObj)
    return (dispatch) => {
        return axios.post("/api/signup", regObj).then((res) => {
            console.log("register response ", res.status);
            history.push('/login');
        }).catch((err)=>{
            console.log("ERrr", err.response)
            if(err.response.status != 200){
                toast.error(err.response.data.message)
            }
        });
    }
}


export const login = (loginData) => {
    return (dispatch) => {
        return axios.post("/api/login", loginData).then((res) => {
            console.log("loginData response ", res.data);
            userService.setToken(res.data);
            dispatch({
                type:'LOGIN_SUCCESS',
                payload:res.data
            })
            dispatch({
                type:'LOGIN_USER_INFO',
                payload:{}
            })
            history.push('/profile');
        }).catch((err)=>{
            console.log("Err is ", err.response.status)
            dispatch({
                type:'LOGIN_FAILED',
            })
            history.push('/login');
            if(err.response.status != 200){
                toast.error(err.response.data.message)
            }
        });
    }
}


export const logout = () => {
    return (dispatch) => {
        userService.logout();
        history.push('/login');
        dispatch({
            type:'LOGOUT_SUCCESS'
        })
        dispatch({
            type:'LOGIN_USER_INFO',
            payload:{}
        })
    }
}


export const fetchUserData = (data) => {
    return (dispatch) => {
        var user = localStorage.getItem('loggedIn_email')
        return axios.get("/api/me/" + user).then((res) => {
            console.log("fetchUserData response ", res);
            dispatch({
                type:'LOGIN_USER_INFO',
                payload:res.data
            })
        }).catch((err)=>{
            console.log("ERR is", err)
        });
    }
}