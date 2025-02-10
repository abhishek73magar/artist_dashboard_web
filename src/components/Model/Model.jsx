import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

const Model = ({ className, title, slug, children, setToggle }) => {
  const containerRef = useRef(null)
  const navigate = useNavigate()
  
  useEffect(() => {
    const handler = (e) => {
      if(containerRef.current && !containerRef.current.contains(e.target)) {
      const confirm = window.confirm('Save before exit?')
      if(confirm) {
          if(slug) return navigate(slug)
          if(setToggle) setToggle(false)
      }
    }
  }

    window.addEventListener('mousedown', handler)
    return () => window.removeEventListener('mousedown', handler)
  }, [navigate, setToggle, slug])

  return (
    <article className={twMerge('fixed top-0 left-0 h-full w-full bg-slate-800/50 flex flex-col justify-center items-center p-4 overflow-auto')} style={{ zIndex: 6000 }}>
      <div className={twMerge('relative bg-white max-w-[600px] w-[98%] mx-auto min-h-[300px] rounded-lg animation-enter overflow-auto', className)} ref={containerRef}>
        <div className='flex flex-row justify-between items-center gap-2 bg-primary text-white font-semibold py-3 px-2 rounded-t-lg top-0 sticky' style={{ zIndex: 5000 }}>
          <div className='px-2 text-lg'>{title}</div>
          <Link to={slug} className='px-2  text-white text-opacity-80 hover:text-opacity-100'>
            <IoClose className='text-xl font-extrabold' />
          </Link>
        </div>
        <div className='w-full'>
          {children}
        </div>
      </div>
    </article>
  )
}

Model.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  setToggle: PropTypes.func,
  slug: PropTypes.string,
  title: PropTypes.string,
}

export default Model