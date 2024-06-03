import { forwardRef } from "react"

const InputForm = forwardRef((props :any, ref) => {
    const { label = "", type, name, placeholder,  onChange, value} = props
    return (
        <>
            <div className="form-group mb-3">
                <label htmlFor={name}>{label}</label>
                <input type={type} className="form-control" name={name} id={name} placeholder={placeholder} onChange={onChange} value={value} />
            </div>
        </>        
    )
})

export default InputForm