import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'

const CommonOutlet = ({ component }) => {
  return (
    <>
      {component}
      <Outlet />
    </>
  )
}

CommonOutlet.propTypes = {
  component: PropTypes.node
}

export default CommonOutlet