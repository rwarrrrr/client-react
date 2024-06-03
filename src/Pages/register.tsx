import FormRegister from "../Components/Fragments/FormRegister"
import AuthLayouts from "../Components/Layouts/AuthLayouts"
import { useLogin } from "../Hooks/useLogin"


const RegisterPage = () => {

    const login = useLogin();

    return (
        <AuthLayouts title="Register" type="register">
            <FormRegister />            
        </AuthLayouts>
    )
}

export default RegisterPage