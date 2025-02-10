import Button from "components/FormElement/Button"
import Checkbox from "components/FormElement/Checkbox";
import Inputbox from "components/FormElement/Inputbox"
import { displayError, zodError } from "libs/getError"
import { useForm } from "react-hook-form"
import { FaHandsClapping } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from "utils/zod.schema";
import { authApi } from "libs/api";
import { SETAUTH_TOKEN } from "libs/jwtToken";
import { PREV_PATH } from "libs/config";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues: { email: "", password: "", stay: false }, resolver: zodResolver(LoginSchema)})
  const navigate = useNavigate()

  const __handleSubmit = async(formdata) => {
    try {
      const auth = await authApi.login(formdata)
      if(auth.status === 200){
        SETAUTH_TOKEN(auth.data.token)
        const prevPath = localStorage.getItem(PREV_PATH) ?? '/' // get previous path
        localStorage.removeItem(PREV_PATH)

        return navigate(prevPath)
      }
    } catch (error) {
      return displayError(error)
    }
  }

  return (
    <article className="min-h-screen flex flex-col justify-center items-center ">
      <form method="post" onSubmit={handleSubmit(__handleSubmit)} className="w-full max-w-[450px] px-8 py-8 flex flex-col justify-start items-start gap-2 rounded-md shadow-2xl">
        <div className="text-4xl">Login</div>
        <div className="flex flex-row justify-start items-center gap-2 font-medium">Hi, Welcome back <FaHandsClapping className="text-orange-300" /></div>
        <Inputbox 
          label="Email"
          name="email"
          register={register('email')}
          error={zodError(errors, 'email')}
          placeholder="Email"
        />
        <Inputbox 
          label="Password"
          type="password"
          name="password"
          register={register('password')}
          error={zodError(errors, 'password')}
          placeholder="Password"
        />
        <Checkbox 
          label="Remember Me"
          name="stay"
          register={register("stay")}
          error={zodError(errors, 'stay')}
        />
        <div className="my-2 ml-auto w-full">
          <Button className="" type="submit" isLoading={isSubmitting}>Login</Button>
        </div>
      <div className="w-full flex flex-row justify-center items-center gap-2">
        Not registered yet? <Link to="/signup" className="flex flex-row justify-start items-center gap-2 text-primary" title="Create an account"><b>Create an account</b> <GoArrowUpRight /></Link>
      </div>
      </form>
    </article>
  )
}

export default Login