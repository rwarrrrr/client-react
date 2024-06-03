import { useState } from "react";
import Button from "../Elements/Button"
import InputForm from "../Elements/Input"
import { register } from "../../Services/auth.service";

const FormRegister = () => {
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const validatePassword = () => {
        if (password !== retypePassword) {
          return "Password dan retype password tidak sama";
        }
  
        if (password.length <= 5) {
          return "Password harus lebih dari 5 karakter";
        }
  
        if (!/[A-Z]/.test(password)) {
          return "Password harus mengandung huruf besar";
        }
  
        if (!/[a-z]/.test(password)) {
          return "Password harus mengandung huruf kecil";
        }
  
        if (!/[0-9]/.test(password)) {
          return "Password harus mengandung angka";
        }
  
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
          return "Password harus mengandung karakter spesial";
        }
  
        return "";
    };  
  
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const validate_password = validatePassword()
        if(validate_password){
            setErrorMessage(validatePassword)
        }else{
            const data = {
                username: e.target.username.value,
                password: e.target.password.value
            }
            register(data, (res: any) => {              
                if(res.status === 201){
                  window.location.href = '/'
                }else{
                  setErrorMessage(res.response.data.message)
                }
            })
            // window.location.href = '/'
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                
                <InputForm label="Username" type="text" name="username" placeholder="Masukan Username" />
                <InputForm label="Password" type="password" name="password" placeholder="Masukan Password" onChange={(e:any) => setPassword(e.target.value)} />
                <InputForm label="Confirm Password" type="password" name="re_password" placeholder="Masukan Confirm Password" onChange={(e:any) => setRetypePassword(e.target.value)} />

                <Button classname="btn-primary" type="submit">Register</Button>
                {errorMessage && <p>{errorMessage}</p>}   
            </form>
        </>
    )
}

export default FormRegister