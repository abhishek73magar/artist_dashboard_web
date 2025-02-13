import Button from "components/FormElement/Button"
import Pagination from "components/Pagination/Pagination"
import Table from "components/Table/Table"
import useStorepagenumber from "hooks/useStorepagenumber"
import { artistApi } from "libs/api"
import { getError, logError } from "libs/getError"
import moment from "moment"
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

  const __exportAsCSV = () => {
    if(!user || !Array.isArray(user.data) || user.data.length === 0) return toast.error("Artist list is empty")
    const head = Object.keys(user.data[0])
    const dd = user.data.map((item) => {
      return head.map(key => {
        if(key === 'dob' && item[key]) return moment(item.key).format('YYYY-MM-DD')
        return item[key]
      }).join(',')
    }).join('\n')
    const csvString = head.join(',') + '\n' + dd
    const blob = new Blob([csvString], { type: "text/csv" })

    // Generate download link
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.setAttribute("href", url)
    link.setAttribute("download", "artist-list.csv")
    document.body.appendChild(link)
    link.click()
    // remove download link from main body
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const __importAsCsv = async(e) => {
    try {
      console.log(e.target.files)
      const file = e.target.files[0]
      if(!file) return toast.error("File must be required !!")
      const formdata = new FormData()
      formdata.append('csv-file', file)
      const req = await toast.promise(artistApi.importAsCsv(formdata), {
        loading: "saving...",
        success: "Artist added successfully",
        error: getError
      })

      if(req.status === 201){
        muate.addPagination(req.data, pagenumber)
        return req.data;
      }
    } catch (error) {
      return logError(error)
    }
  } 

  return (
    <section>
      <div className="text-4xl">Artist List</div>
      <div className="flex flex-row justify-start items-center gap-2 font-medium">All available artist</div>
      <div className="pb-8">
        <div className="flex flex-row justify-end gap-2">
          <Button type="button" className={'w-[130px]'} onClick={__exportAsCSV}>Export as CSV</Button>
          {/* <Button type="button" className={'w-[150px]'}>Import from CSV</Button> */}
          <label htmlFor="import_csv" className="px-2 py-2 w-[150px] text-center bg-primary text-white rounded-md hover:bg-primary/50 cursor-pointer font-semibold">
            Import from CSV
            <input type="file" onChange={__importAsCsv} accept="text/csv" hidden id="import_csv" />
          </label>
        </div>
        <Table 
          colnames={colnames}
          isLoading={isLoading}
          data={user && Array.isArray(user.data) ? user.data.map((item) => ({ ...item, view: <Link to={`${item.id}/music`} className="text-primary underline hover:opacity-50">View</Link>})) : []}
          searchBy={['name']}
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