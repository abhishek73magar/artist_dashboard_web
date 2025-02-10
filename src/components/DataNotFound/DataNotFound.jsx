import { twMerge } from 'tailwind-merge'
import { FcDeleteDatabase } from "react-icons/fc";
import PropTypes from 'prop-types';

const DataNotFound = ({ className, text="Data not found !" }) => {
  return (
    <div className={twMerge('flex flex-col gap-2 items-center justify-center text-base min-h-[250px] w-full', className)}>
      <FcDeleteDatabase className='text-4xl' />
      <div>{text}</div>
    </div>
  )
}

DataNotFound.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string
}

export default DataNotFound