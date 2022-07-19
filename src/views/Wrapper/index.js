import style from "./index.module.scss"


const Wrapper = ({variant, children}) => {
  return <div className={style[variant]}>{children}</div>
}

export default Wrapper
