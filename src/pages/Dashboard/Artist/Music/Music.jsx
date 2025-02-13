import Pagination from "components/Pagination/Pagination"
import Table from "components/Table/Table"
import useStorepagenumber from "hooks/useStorepagenumber"
import { artistApi, musicApi } from "libs/api"
import { getError, logError } from "libs/getError"
import toast from "react-hot-toast"
import { useParams, useSearchParams } from "react-router-dom"

const colnames = [
  { name: "ID", key: "id" },
  { name: "Title", key: "title" },
  { name: "Album Name", key: "album_name" },
  { name: "Genre", key: "genre" },
  { name: "Artist", key: "artist_name" },
  { name: "Create At", key: "created_at", type: "date-from-now" },
  { name: "Update At", key: "updated_at", type: "date-from-now" },
  { name: "Action", key: 'action', type: "action" }
]

const User = () => {
  const { artist_id } = useParams()
  const { data: artist } = artistApi.useFetchById(artist_id)
  const [query] = useSearchParams()
  const pagenumber = query.get('page') ?? sessionStorage.getItem('pagenumber') ?? 1
  const { data: user, isLoading } = musicApi.usePagination(pagenumber)
  const muate = musicApi.useFetchUpdate()
  useStorepagenumber(pagenumber)

  const __removeUser = async(id) => {
    try {
      const confirm = window.confirm("Are you sure ?")
      if(!confirm) return;
      const req = await toast.promise(musicApi.del(id), {
        loading: "deleting...",
        success: "User deleted",
        error: getError
      })

      if(req.status === 200){
        muate.removePagination(id, pagenumber)
        return req.data
      }

    } catch (error) {
      return logError(error)
    }
  }

  return (
    <section>
      <div className="text-4xl">Music List</div>
      <div className="flex flex-row justify-start items-center gap-2 font-medium"><b>{artist ? `${artist.name}'s` : ""},</b> all available music</div>

      <div>
        <Table 
          colnames={colnames}
          isLoading={isLoading}
          data={user && Array.isArray(user.data) ? user.data.map((item) => ({ ...item, fullname: `${item.first_name} ${item.last_name}`})) : []}
          searchBy={['first_name', 'last_name', 'email']}
          serachBox
          // edit=""
          slug=""
          addNew={"add"}
          onDelete={__removeUser}
          resource={'music'}
        />

        {user && <Pagination page={user.pagenumber} total={user.totalpage || 1} />}
      </div>
    </section>
  )
}

export default User