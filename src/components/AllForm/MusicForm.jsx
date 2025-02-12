import Button from "components/FormElement/Button"
import Inputbox from "components/FormElement/Inputbox"
import { logError, zodError } from "libs/getError"
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { MusicSchema } from "utils/zod.schema";
import PropTypes from "prop-types";
import Select from "components/FormElement/Select"
import { genreList } from "utils/optionList"

const formPayload = {
  title: "",
  album_name: "",
  genre: '',
}

const MusicForm = ({ onSubmit, data=formPayload, type='add' }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, watch, reset } = useForm({ defaultValues: data, mode: "onChange", resolver: zodResolver(MusicSchema)})

  const __handleSubmit = (formdata) => {
    if(!onSubmit) return;

    return onSubmit(formdata)
      .then(() => {
        if(type === 'add') reset(formPayload)
      }).catch(logError)
  }

  return (
    <form method="post" onSubmit={handleSubmit(__handleSubmit)} className="w-full flex flex-col justify-start items-start gap-2">
      <Select 
        label={"Genre"}
        name="genre"
        option={{ label: "name", value: "value" }}
        list={genreList}
        value={watch('genre')}
        onChange={(name, value) => setValue(name, value, { shouldValidate: true })}
        error={zodError(errors, 'genre')}
      />
      <Inputbox 
        label="Title"
        name="title"
        register={register('title')}
        error={zodError(errors, 'title')}
        placeholder="Title"
      />
        
      <Inputbox 
        label="Album Name"
        name="album_name"
        register={register('album_name')}
        error={zodError(errors, 'album_name')}
        placeholder="Album Name"
      />
      
      <div className="my-2 ml-auto w-full">
        <Button className="" type="submit" isLoading={isSubmitting}>Save</Button>
      </div>
    </form>
  )
}

MusicForm.propTypes = {
  onSubmit: PropTypes.func,
  type: PropTypes.oneOf(["add", "edit"]),
  data: PropTypes.object,
}

export default MusicForm