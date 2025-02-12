import MusicForm from "components/AllForm/MusicForm"
import DataNotFound from "components/DataNotFound/DataNotFound"
import Model from "components/Model/Model"
import Spinner from "components/Spinner/Spinner"
import { musicApi } from "libs/api"
import { getError } from "libs/getError"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

const EditMusic = () => {
  const { id, artist_id } = useParams()
  const { data, isLoading } = musicApi.useFetchById(id, { fetchOnMount: "always" })
  const mutate = musicApi.useFetchUpdate()


  const __editData = async(formdata) => {
    try {
      const req = await toast.promise(musicApi.update(id, formdata), {
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
      <Model slug={`/artist/${artist_id}/music`} title="Edit Music">
        <article className="px-8 py-4">
          {data ? 
            <MusicForm 
              data={data} 
              onSubmit={__editData} 
              type="edit" 
            /> 
          : isLoading ? <Spinner /> : <DataNotFound />}
        </article>
      </Model>
    )
}

export default EditMusic