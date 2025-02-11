import Pagination from "components/Pagination/Pagination"
import Table from "components/Table/Table"
import useStorepagenumber from "hooks/useStorepagenumber"
import { userApi } from "libs/api"
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
  useStorepagenumber(pagenumber)

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
        />

        {user && <Pagination page={user.pagenumber} total={user.totalpage} />}
      </div>
    </section>
  )
}

export default User