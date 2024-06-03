const Button = (props: any) => {
      const {children = '...', classname = '', onClick = () => {}, type="button"} = props 
      return(
        <button 
          className={`btn ${classname}`} 
          type={type}
          onClick={onClick}
        >
            {children}
        </button>
      )
    }

export default Button;