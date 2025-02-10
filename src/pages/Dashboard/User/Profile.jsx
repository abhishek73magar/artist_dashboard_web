import UserForm from "components/AllForm/UserForm"
import Spinner from "components/Spinner/Spinner"
import { authApi } from "libs/api"
import { getError } from "libs/getError"
import moment from "moment"
import toast from "react-hot-toast"
import { FaHandsClapping } from "react-icons/fa6"
import { EditProfile } from "utils/zod.schema"

const Profile = () => {
  const { data: user, isLoading } = authApi.useProfile()
  const muate = authApi.useMutateProfile()

  const __updateProfile = async(formdata) => {
    try {
      const res = await toast.promise(authApi.updateProfile(formdata), {
        loading: "Saving",
        success: "Saved",
        error: (err) => getError(err)
      })

      if(res.status === 200){
        // console.log(res.data)
        muate.update(user.id, res.data)
        return;
      }

    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <section>
      <article className="max-w-[500px]">
        <div className="text-4xl">User Profile</div>
        <div className="flex flex-row justify-start items-center gap-2 font-medium">Hi, Abhishek your can update your profile here <FaHandsClapping className="text-orange-300" /></div>
        <br />
        {user && !isLoading ? 
          <UserForm 
            onSubmit={__updateProfile} 
            data={{...user, dob: moment(user.dob).format('YYYY-MM-DD')}}
            type="edit"
            schema={EditProfile}
          /> 
        : <Spinner />  }
      </article>
    </section>
  )
}

export default Profile