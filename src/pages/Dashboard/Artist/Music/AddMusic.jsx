import MusicForm from "components/AllForm/MusicForm"
import Model from "components/Model/Model"
import { musicApi } from "libs/api"
import { getError } from "libs/getError"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom"

const AddMusic = () => {
  const mutate = musicApi.useFetchUpdate()
  const { artist_id } = useParams()
  
  const __addData = async(formdata) => {
    try {
      Object.assign(formdata, { artist_id })
      const req = await toast.promise(musicApi.post(formdata), {
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
    <Model slug={`/artist/${artist_id}/music`} title="Add Aritst">
      <article className="px-8 py-4">
        <MusicForm onSubmit={__addData} />
      </article>
    </Model>
  )
}

export default AddMusic