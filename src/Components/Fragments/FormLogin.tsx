import { useState } from "react"
import { login } from "../../Services/auth.service"
import Button from "../Elements/Button"
import InputForm from "../Elements/Input"

const FormLogin = () => {
    const [loginFail, setLoginFail] = useState("")
    
    const handleSubmit = (e: any) => {
        e.preventDefault()

        const data = {
            username: e.target.username.value,
            password: e.target.password.value
        }

        login(data, (res: any) => {
            if(res.status === 200){
              localStorage.setItem('token', res.data.acces_token)
              window.location.href = '/home'
            }else{
              setLoginFail(res.response.data.message)
            }
        })

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                
                <InputForm label="Username" type="text" name="username" placeholder="Masukan Username" />
                <InputForm label="Password" type="password" name="password" placeholder="Masukan Password" />

                <Button classname="btn-primary" type="submit">Login</Button>
                {loginFail && <p className="text-center">{loginFail}</p>}
            </form>
        </>
    )
}

export default FormLogin