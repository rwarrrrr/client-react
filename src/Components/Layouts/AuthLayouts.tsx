import { Link } from "react-router-dom"

const AuthLayouts = (props: any) => {
    const { children, title, type } = props
    return (
      <>
      <div className="vh-100 d-flex align-items-center">
        <div className="card md-5 mx-auto col-md-3 offset-md-5 p-3 bg-light shadow rounded ">
          <div className="card-body">

            <div className="text-center">
              <h1>{title}</h1>
            </div>

            {children}
            <Navigation type={type} />
          </div>
        </div>
      </div>
      </>
    )
}

const Navigation = (props: any) => {
  const { type } = props
    if(type === "login"){
      return (
        <p className="text-sm mt-5 text-center">
          Don't have an account?{" "}       
          <Link to="/register" className="font-bold text-blue-600">Sign up</Link>          
        </p>
      )
    }else{
      return (
        <p className="text-sm mt-5 text-center">
          Already have an account?{" "}       
          <Link to="/" className="font-bold text-blue-600">Sign in</Link>          
        </p>
      )
    }
}

export default AuthLayouts