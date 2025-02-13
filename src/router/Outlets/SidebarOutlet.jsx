import NoPermission from 'components/DataNotFound/NoPermission'
import Sidebar from 'components/Navigation/Sidebar'
import Spinner from 'components/Spinner/Spinner'
import { DECODE_TOKEN } from 'libs/jwtToken'
import { Suspense, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import { _setUser, _verifyUser, selectPermission } from 'store/redcuer/UserStore'

const routes = [
  { path: "/user", resource: "user" },
  { path: "/artist", resource: 'artist' }
]

const SidebarOutlets = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const permission = useSelector(selectPermission)
  const [noPermission, setNoPermission] = useState(false)

  useEffect(() => {
    dispatch(_setUser(DECODE_TOKEN()))
    dispatch(_verifyUser())
  }, [dispatch])

  useEffect(() => {
    if(permission){
      const route = routes.find(r => location.pathname.includes(r.path))
      if(route) setNoPermission(!permission.view.includes(route.resource))
      else setNoPermission(false)
    }
  }, [location.pathname, permission])
  
  return (
    <>
      <Sidebar />
      <main className='w-ful h-screen ml-[270px] px-4 py-4'>
        <Suspense fallback={<Spinner />}>
          {noPermission ? <NoPermission /> : <Outlet /> }   
        </Suspense>
      </main>
    </>
  )
}

export default SidebarOutlets