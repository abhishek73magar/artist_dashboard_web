import UserForm from "components/AllForm/UserForm"
import Model from "components/Model/Model"
import { userApi } from "libs/api"
import { getError } from "libs/getError"
import toast from "react-hot-toast"

const AddUser = () => {
  const mutate = userApi.useFetchUpdate()
  const __addUser = async(formdata) => {
    try {
      const req = await toast.promise(userApi.post(formdata), {
        loading: 'saving...', 
        success: "Saved",
        error: getError,
      })        

      if(req.status === 201){
        mutate.addPagination(req.data, 1)
        return req.data
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }

  return (
    <Model slug={"/user"} title="Add User">
      <article className="px-8 py-4">
        <UserForm onSubmit={__addUser} />
      </article>
    </Model>
  )
}

export default AddUser