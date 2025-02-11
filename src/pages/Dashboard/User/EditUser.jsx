import UserForm from "components/AllForm/UserForm"
import DataNotFound from "components/DataNotFound/DataNotFound"
import Model from "components/Model/Model"
import Spinner from "components/Spinner/Spinner"
import { userApi } from "libs/api"
import { getError } from "libs/getError"
import moment from "moment"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { EditProfile } from "utils/zod.schema"

const EditUser = () => {
  const { id } = useParams()
  const { data, isLoading } = userApi.useFetchById(id, { fetchOnMount: "always" })
  const mutate = userApi.useFetchUpdate()


  const __editUser = async(formdata) => {
    try {
      const req = await toast.promise(userApi.update(id, formdata), {
        loading: 'saving...', 
        success: "Saved",
        error: getError,
      })        

      if(req.status === 200){
        mutate.updateById(id, req.data)
        mutate.updatePagination(id, req.data)
        return req.data
      }

    } catch (error) {
      return Promise.reject(error)
    }
  }
  
    return (
      <Model slug={"/user"} title="Edit User">
        <article className="px-8 py-4">
          {data ? 
            <UserForm 
            data={{ ...data, dob: moment(data.dob).format('YYYY-MM-DD')}} 
            onSubmit={__editUser} 
            type="edit" 
            schema={EditProfile}
          /> 
          : isLoading ? <Spinner /> : <DataNotFound />}
        </article>
      </Model>
    )
}

export default EditUser