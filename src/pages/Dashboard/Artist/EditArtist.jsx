import AritstForm from "components/AllForm/ArtistForm"
import DataNotFound from "components/DataNotFound/DataNotFound"
import Model from "components/Model/Model"
import Spinner from "components/Spinner/Spinner"
import { artistApi } from "libs/api"
import { getError } from "libs/getError"
import moment from "moment"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"
import { EditProfile } from "utils/zod.schema"

const EditArtist = () => {
  const { id } = useParams()
  const { data, isLoading } = artistApi.useFetchById(id, { fetchOnMount: "always" })
  const mutate = artistApi.useFetchUpdate()


  const __editData = async(formdata) => {
    try {
      const req = await toast.promise(artistApi.update(id, formdata), {
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
      <Model slug={"/artist"} title="Edit Artist">
        <article className="px-8 py-4">
          {data ? 
            <AritstForm 
              data={{ ...data, dob: moment(data.dob).format('YYYY-MM-DD')}} 
              onSubmit={__editData} 
              type="edit" 
              schema={EditProfile}
            /> 
          : isLoading ? <Spinner /> : <DataNotFound />}
        </article>
      </Model>
    )
}

export default EditArtist