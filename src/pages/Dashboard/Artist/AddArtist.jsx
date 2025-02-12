import AritstForm from "components/AllForm/ArtistForm"
import Model from "components/Model/Model"
import { artistApi } from "libs/api"
import { getError } from "libs/getError"
import toast from "react-hot-toast"

const AddArtist = () => {
  const mutate = artistApi.useFetchUpdate()
  
  const __addArtist = async(formdata) => {
    try {
      const req = await toast.promise(artistApi.post(formdata), {
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
    <Model slug={"/artist"} title="Add Aritst">
      <article className="px-8 py-4">
        <AritstForm onSubmit={__addArtist} />
      </article>
    </Model>
  )
}

export default AddArtist