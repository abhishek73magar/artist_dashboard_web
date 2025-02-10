import PropTypes from "prop-types"

const Radiobutton = ({ label, name, id, error, register={}, ...inputProps}) => {
  return (
    <div className="flex flex-col justify-start items-center">
      <div className="flex flex-row justify-start items-center gap-2 cursor-pointer group">
        <input
          type="radio"
          className="accent-gray-900"
          name={name}
          id={id ?? name}
          {...register}
          {...inputProps}
        />

        <label htmlFor={id ?? name} className="font-bold group-hover:opacity-85 cursor-pointer">{label}</label>
      </div>
      {error && <div className="px-1 text-sm text-red-500">{error}</div>}
    </div>
  )
}

Radiobutton.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  register: PropTypes.object
}

export default Radiobutton