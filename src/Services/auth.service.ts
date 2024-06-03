import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const login = (data : any, callback: any) => {

    axios.post('http://localhost:3000/auth/login', data)
    .then((res) => {
        callback(res)
    }).catch((err) => {
        callback(err)
    })
    
}

export const register = (data : any, callback: any) => {
    axios.post('http://localhost:3000/auth/register', data)
    .then((res) => {
        callback(res)
    }).catch((err) => {
        callback(err)
    })
}

export const getToken = (token:any) => {
    if(token){
        const decoded = jwtDecode(token)
        return decoded
    }
}

export const getAllUser = async (callback: any) => {
    axios.get(
        'http://localhost:3000/api/users',
        {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }
    )
    .then((res) => {
        callback(res)
    }).catch((err) => {
        callback(err)
    })
} 