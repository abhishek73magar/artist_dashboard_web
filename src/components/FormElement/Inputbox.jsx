import PropTypes from 'prop-types'
import { useState } from 'react'
import { IoEye, IoEyeOff } from "react-icons/io5";


const Inputbox = ({ type, label, name, id, error, register={}, ...inputProps }) => {
  const [toggle, setToggle] = useState(true)

  return (
    <div className='flex flex-col justify-start items-start gap-2 w-full text-base '>
      {label && <label htmlFor={id ?? name} className='font-bold'>{label}</label>}
      <div className='w-full relative'>
        <input 
          type={type === 'password' ? toggle ? 'password' : 'text' : (type ?? 'text')}
          name={name}
          id={id ?? name}
          className={`outline-none w-full border px-3 py-2 rounded-md ${error ? "ring-2 ring-red-500" : "focus:ring-2 ring-primary"}`}
          {...register}
          {...inputProps}
        />
        {type === 'password' && <div className='absolute top-[12px] right-3 text-slate-500 text-lg cursor-pointer hover:text-slate-800' onClick={() => setToggle(!toggle)}>{toggle ? <IoEyeOff /> : <IoEye />}</div>}
        {error && <div className="text-sm px-1 text-red-500">{error}</div>}
      </div>
    </div>
  )
}

Inputbox.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.error,
  register: PropTypes.object,
}

export default Inputbox