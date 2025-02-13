import Pagination from "components/Pagination/Pagination"
import Table from "components/Table/Table"
import useStorepagenumber from "hooks/useStorepagenumber"
import { userApi } from "libs/api"
import { getError, logError } from "libs/getError"
import toast from "react-hot-toast"
import { useSearchParams } from "react-router-dom"

const colnames = [
  { name: "ID", key: "id" },
  { name: "Fullname", key: "fullname" },
  { name: "Email", key: "email" },
  { name: "DOB", key: "dob", type: "date-only" },
  { name: "Gender", key: "gender" },
  { name: "Role", key: "role" },
  { name: "Create At", key: "created_at", type: "date-from-now" },
  { name: "Update At", key: "updated_at", type: "date-from-now" },
  { name: "Action", key: 'action', type: "action" }
]

const User = () => {
  const [query] = useSearchParams()
  const pagenumber = query.get('page') ?? sessionStorage.getItem('pagenumber') ?? 1
  const { data: user, isLoading } = userApi.usePagination(pagenumber)
  const muate = userApi.useFetchUpdate()
  useStorepagenumber(pagenumber)

  const __removeUser = async(id) => {
    try {
      const confirm = window.confirm("Are you sure ?")
      if(!confirm) return;
      const req = await toast.promise(userApi.del(id), {
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
      <div className="text-4xl">User List</div>
      <div className="flex flex-row justify-start items-center gap-2 font-medium">All Users Are here</div>

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
          resource={"user"}
        />

        {user && <Pagination page={user.pagenumber} total={user.totalpage} />}
      </div>
    </section>
  )
}

export default User