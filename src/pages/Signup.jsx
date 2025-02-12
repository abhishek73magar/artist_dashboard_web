import { FaHandsClapping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import UserForm from "components/AllForm/UserForm";
import { displayError } from "libs/getError";
import { authApi } from "libs/api";
import { SETAUTH_TOKEN } from "libs/jwtToken";
import { PREV_PATH } from "libs/config";

const Signup = () => {
  const navigate = useNavigate()
  const __handleSubmit = async(formdata) => {
    try {
      const auth = await authApi.signup(formdata)
      if(auth.status === 201){
        
        SETAUTH_TOKEN(auth.data.token)
        const prevPath = localStorage.getItem(PREV_PATH) ?? '/' // get previous path
        localStorage.removeItem(PREV_PATH)

        return navigate(prevPath)
      }
    } catch (error) {
      displayError(error)
      return Promise.reject(error)
    }
  }

  return (
    <article className="min-h-screen flex flex-col justify-center items-center ">
      <div className="w-full max-w-[480px] px-8 py-8 flex flex-col justify-start items-start gap-2 rounded-md shadow-2xl">
        <div className="text-4xl">Sign Up</div>
        <div className="flex flex-row justify-start items-center gap-2 font-medium">Hi, Please create your artist account <FaHandsClapping className="text-orange-300" /></div>
        
        <UserForm onSubmit={__handleSubmit} type="signup" name={"Signup"} />

        <div className="w-full flex flex-row justify-center items-center gap-2">
          If you are already registered? <Link to="/login" className="flex flex-row justify-start items-center gap-2 text-primary" title="Login"><b>Login</b> <GoArrowUpRight /></Link>
        </div>
      </div>
    </article>
  )
}

export default Signup