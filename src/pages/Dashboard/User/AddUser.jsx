import UserForm from "components/AllForm/UserForm"
import Model from "components/Model/Model"

const AddUser = () => {
  return (
    <Model slug={"/user"} title="Add User">
      <article className="px-8 py-4">
        <UserForm />
      </article>
    </Model>
  )
}

export default AddUser