import FormLogin from "../Components/Fragments/FormLogin"
import AuthLayouts from "../Components/Layouts/AuthLayouts"
import { useLogin } from "../Hooks/useLogin"


const LoginPage = () => {
   
    const login = useLogin();

    return (
        <AuthLayouts title="Login" type="login">
            <FormLogin />            
        </AuthLayouts>
    )
}

export default LoginPage