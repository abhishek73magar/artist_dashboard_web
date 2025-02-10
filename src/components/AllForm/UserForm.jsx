import Button from "components/FormElement/Button"
import Inputbox from "components/FormElement/Inputbox"
import { logError, zodError } from "libs/getError"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { SignupSchema } from "utils/zod.schema";
import Radiobutton from "components/FormElement/Radiobutton";
import PropTypes from "prop-types";
import Select from "components/FormElement/Select"

const formPayload = {
  first_name: "",
  last_name: "",
  email: "",
  dob: "",
  gender: 'm',
  phone: "",
  address: '',
  password: '',
  cpassword: ''
}

const roleOptions = [
  { name: "Artist", value: "artist" },
  { name: "Artist Manager", value: "artist_manager" }
]

const UserForm = ({ onSubmit, data, type='add', schema=SignupSchema }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ defaultValues: type === 'add' ? formPayload : data, mode: "onChange", resolver: zodResolver(schema)})
  
  const __handleSubmit = (formdata) => {
    if(!onSubmit) return;
    delete formdata.cpassword;
    return onSubmit(formdata)
      .then(() => {
        if(type === 'add') reset(formPayload)
      }).catch(logError)
  }

  return (
    <form method="post" onSubmit={handleSubmit(__handleSubmit)} className="w-full flex flex-col justify-start items-start gap-2">
      <div className="grid md:grid-cols-2 gap-2 w-full">
        <Inputbox 
          label="First Name"
          name="first_name"
          register={register('first_name')}
          error={zodError(errors, 'first_name')}
          placeholder="First Name"
        />
        <Inputbox 
          label="Last Name"
          name="last_name"
          register={register('last_name')}
          error={zodError(errors, 'last_name')}
          placeholder="Last Name"
        />
      </div>
      <Inputbox 
        label="Email"
        name="email"
        register={register('email')}
        error={zodError(errors, 'email')}
        placeholder="Email"
      />
      
      <Inputbox 
        label="Date of Birth"
        type={'date'}
        name="dob"
        register={register('dob', { valueAsDate: true })}
        error={zodError(errors, 'dob')}
      />

      <div className="flex flex-col justify-start items-start gap-2">
        <label htmlFor="" className="font-bold">Gender</label>
        <div className="flex flex-row justify-start items-center gap-2">
          <Radiobutton label={"Male"} value="m" id="male" register={register("gender")} />
          <Radiobutton label={"Female"} value="f" id="female" register={register("gender")} />
          <Radiobutton label={"Others"} value="o"  id="others" register={register("gender")} />
        </div>
      </div>

      <Inputbox 
        label="Phonenumber"
        name="phone"
        register={register('phone')}
        error={zodError(errors, 'phone')}
        placeholder="Phone number"
      />
      <Inputbox 
        label="Address"
        name="address"
        register={register('address')}
        error={zodError(errors, 'address')}
        placeholder="Address"
      />
      <Select 
        label="Role"
        name="role"
        option={{ label: "name", value: "value" }}
        list={roleOptions}
      />
      <Inputbox 
        label="Password"
        type="password"
        name="password"
        register={register('password')}
        error={zodError(errors, 'password')}
        placeholder="Password"
      />
      <Inputbox 
        label="Confirm Password"
        type="password"
        name="cpassword"
        register={register('cpassword')}
        error={zodError(errors, 'cpassword')}
        placeholder="Confirm Password"
      />
      
      <div className="my-2 ml-auto w-full">
        <Button className="" type="submit" isLoading={isSubmitting}>Login</Button>
      </div>
    </form>
  )
}

UserForm.propTypes = {
  onSubmit: PropTypes.func,
  type: PropTypes.oneOf(["add", "edit"]),
  data: PropTypes.object,
  schema: PropTypes.object
}

export default UserForm