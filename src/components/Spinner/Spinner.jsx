import PropTypes from "prop-types"
import { twMerge } from "tailwind-merge"
import { ImSpinner3 } from "react-icons/im";

const Spinner = ({ className }) => {
  return (
    <div className={twMerge("w-full px-2 py-3 flex flex-col justify-center items-center", className)}>
      <ImSpinner3 className="animate-spin" />
    </div>
  )
}

Spinner.propTypes = {
  className: PropTypes.string
}

export default Spinner