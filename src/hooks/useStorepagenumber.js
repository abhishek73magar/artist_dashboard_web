import { useEffect } from 'react'

const useStorepagenumber = (pagenumber) => {

  useEffect(() => {
    sessionStorage.setItem('pagenumber', pagenumber)
    return () => sessionStorage.removeItem('pagenumber')
  }, [pagenumber])

  return []
}

export default useStorepagenumber