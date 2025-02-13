import Button from "components/FormElement/Button"
import Pagination from "components/Pagination/Pagination"
import Table from "components/Table/Table"
import useStorepagenumber from "hooks/useStorepagenumber"
import { artistApi } from "libs/api"
import { getError, logError } from "libs/getError"
import toast from "react-hot-toast"
import { Link, useSearchParams } from "react-router-dom"

const colnames = [
  { name: "ID", key: "id" },
  { name: "Name", key: "name" },
  { name: "DOB", key: "dob", type: "date-only" },
  { name: "Gender", key: "gender" },
  { name: "No of Albums", key: "no_of_albums_released" },
  { name: "Create At", key: "created_at", type: "date-from-now" },
  { name: "Update At", key: "updated_at", type: "date-from-now" },
  { name: "View", key: "view" },
  { name: "Action", key: 'action', type: "action" }
]

const Artist = () => {
  const [query] = useSearchParams()
  const pagenumber = query.get('page') ?? sessionStorage.getItem('pagenumber') ?? 1
  const { data: user, isLoading } = artistApi.usePagination(pagenumber)
  const muate = artistApi.useFetchUpdate()
  useStorepagenumber(pagenumber)

  const __removeUser = async(id) => {
    try {
      const confirm = window.confirm("Are you sure ?")
      if(!confirm) return;
      const req = await toast.promise(artistApi.del(id), {
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
      <div className="text-4xl">Artist List</div>
      <div className="flex flex-row justify-start items-center gap-2 font-medium">All available artist</div>
      <div>
        {/* <div className="flex flex-row justify-end gap-2">
          <Button type="button" className={'w-[130px]'}>Export as CSV</Button>
          <Button type="button" className={'w-[150px]'}>Import from CSV</Button>
        </div> */}
        <Table 
          colnames={colnames}
          isLoading={isLoading}
          data={user && Array.isArray(user.data) ? user.data.map((item) => ({ ...item, view: <Link to={`${item.id}/music`} className="text-primary underline hover:opacity-50">View</Link>})) : []}
          searchBy={['first_name', 'last_name', 'email']}
          serachBox
          // edit=""
          slug=""
          addNew={"add"}
          onDelete={__removeUser}
          resource={'artist'}
        />

        {user && <Pagination page={user.pagenumber} total={user.totalpage} />}
      </div>
    </section>
  )
}

export default Artist