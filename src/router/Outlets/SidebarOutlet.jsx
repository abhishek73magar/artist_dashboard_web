import Sidebar from 'components/Navigation/Sidebar'
import Spinner from 'components/Spinner/Spinner'
import { DECODE_TOKEN } from 'libs/jwtToken'
import { Suspense, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { _setUser } from 'store/redcuer/UserStore'

const SidebarOutlets = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(_setUser(DECODE_TOKEN()))
  }, [dispatch])
  

  return (
    <>
      <Sidebar />
      <main className='w-ful h-screen ml-[270px] px-4 py-4'>
        <Suspense fallback={<Spinner />}>
          <Outlet />    
        </Suspense>
      </main>
    </>
  )
}

export default SidebarOutlets