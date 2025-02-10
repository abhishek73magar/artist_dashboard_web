import { useMemo } from "react"
import { useSelector } from "react-redux"
import { selectPermission, selectUser } from "store/redcuer/UserStore"

const useCheckPermission = (resource) => {
  const permission = useSelector(selectPermission)
  const user = useSelector(selectUser)
  
  const __checkPermission = useMemo(() => {
    // Check if the user has permission to view and edit the resource
    if(!resource) return [true, true]; // if resource is not provided, return true
    if(user && user.role === 'super_admin') return [true, true]
    const view = permission && permission.view ? permission.view.inclues(resource) : false;
    const modify = permission && permission.edit ? permission.edit.inclues(resource) : false;
    
    

    return [view, modify] // view, edit
  }, [permission, resource, user])

  return __checkPermission
}

export default useCheckPermission