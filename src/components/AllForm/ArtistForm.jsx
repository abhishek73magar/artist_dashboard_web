import Button from "components/FormElement/Button"
import Inputbox from "components/FormElement/Inputbox"
import { logError, zodError } from "libs/getError"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { ArtistSchema } from "utils/zod.schema";
import Radiobutton from "components/FormElement/Radiobutton";
import PropTypes from "prop-types";

const formPayload = {
  name: "",
  dob: "",
  gender: 'm',
  address: '',
  no_of_albums_released: '',
}

const AritstForm = ({ onSubmit, data=formPayload, type='add' }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({ defaultValues: data, mode: "onChange", resolver: zodResolver(ArtistSchema)})

  const __handleSubmit = (formdata) => {
    if(!onSubmit) return;
    if(isNaN(formdata.no_of_albums_released)) Object.assign(formdata, { no_of_albums_released: null })

    return onSubmit(formdata)
      .then(() => {
        if(type === 'add') reset(formPayload)
      }).catch(logError)
  }

  return (
    <form method="post" onSubmit={handleSubmit(__handleSubmit)} className="w-full flex flex-col justify-start items-start gap-2">
      <Inputbox 
        label="Name"
        name="name"
        register={register('name')}
        error={zodError(errors, 'name')}
        placeholder="Name"
      />
        

      <div className="grid md:grid-cols-2 gap-2 w-full">
        <Inputbox 
          label="Date of Birth"
          type={'date'}
          name="dob"
          register={register('dob', { valueAsDate: true })}
          error={zodError(errors, 'dob')}
        />

        <Inputbox 
          label="No of Albums Released"
          type="number"
          name="no_of_albums_released"
          register={register('no_of_albums_released', { valueAsNumber: true })}
          error={zodError(errors, 'no_of_albums_released')}
          placeholder="No of Albums Released"
        />
      </div>

      <div className="flex flex-col justify-start items-start gap-2">
        <label htmlFor="" className="font-bold">Gender</label>
        <div className="flex flex-row justify-start items-center gap-2">
          <Radiobutton label={"Male"} value="m" id="male" register={register("gender")} />
          <Radiobutton label={"Female"} value="f" id="female" register={register("gender")} />
          <Radiobutton label={"Others"} value="o"  id="others" register={register("gender")} />
        </div>  
      </div>
      

      <Inputbox 
        label="Address"
        name="address"
        register={register('address')}
        error={zodError(errors, 'address')}
        placeholder="Address"
      />

      
      <div className="my-2 ml-auto w-full">
        <Button className="" type="submit" isLoading={isSubmitting}>Save</Button>
      </div>
    </form>
  )
}

AritstForm.propTypes = {
  onSubmit: PropTypes.func,
  type: PropTypes.oneOf(["add", "edit"]),
  data: PropTypes.object,
}

export default AritstForm