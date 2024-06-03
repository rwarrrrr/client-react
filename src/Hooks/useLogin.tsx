import { useEffect } from "react"
import { getToken } from "../Services/auth.service"

export const useLogin = () => {
    
    useEffect(() => {
        const token = getToken(localStorage.getItem('token'))   
        
        if(token?.exp && Date.now() <= token.exp * 1000) {
            window.location.href = '/home'
        }
    }, [])
    return ''
}