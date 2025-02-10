import PropTypes from 'prop-types'
import { ImSpinner3 } from 'react-icons/im'
import { twMerge } from 'tailwind-merge'

const Button = ({ children, className, isLoading=false, ...btnProps }) => {
  return (
    <button disabled={isLoading} className={twMerge("w-full px-3 py-2 flex flex-row justify-center items-center gap-2 bg-primary text-white hover:bg-primary/50 disabled:bg-primary/50 cursor-pointer rounded-md font-bold", className)} {...btnProps}>
      {isLoading && <ImSpinner3 className="animate-spin" />}
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
  className: PropTypes.string
}

export default Button