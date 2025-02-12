import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import _ from 'lodash'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import PropTypes from 'prop-types'
import { Link, useSearchParams } from 'react-router-dom'


const Pagination = ({ page, total }) => {
  const [query] = useSearchParams()
  const active_page = query.get('page') ?? page ?? 1

  return (
    <div className='flex flex-col justify-center items-end gap-1'>
      <div className=''>{page} of {total}</div>
      <div className='flex flex-row justify-start items-center gap-2 text-primary'>
        <Link 
          to={`?page=${(active_page - 1) < 1 ? 1 : (active_page - 1)  }`} 
          className='p-2 border rounded-full cursor-pointer hover:bg-primary hover:text-white text-lg transition-colors duration-300'
          onClick={(e) => (active_page - 1) < 1 ? e.preventDefault() : null}
          >
            <GrFormPrevious />
          </Link>
        {__getPaginationPages(total, active_page).map((pagenumber, indx) => {
          const isActive = pagenumber === +active_page
          if(pagenumber === '...'){
            return (
              <div key={indx} className='px-3 py-1 '>
                <HiOutlineDotsHorizontal />
              </div>
            )
          }

          return (
            <Link 
              key={indx} 
              to={`?page=${pagenumber}`}
              className={`${isActive ? "bg-primary text-white" : "hover:bg-primary hover:text-white"} flex flex-col justify-center items-center h-[40px] w-[40px] border rounded-full cursor-pointer transition-colors duration-500`}
            >
              {pagenumber}
            </Link>
          )
        })}

        <Link 
          to={`?page=${(+active_page + 1) > total ? total : (+active_page + 1)  }`} 
          className='p-2 border rounded-full cursor-pointer hover:bg-primary hover:text-white text-lg transition-colors duration-300'
          onClick={(e) => (+active_page + 1) > total ? e.preventDefault() : null}
          >
            <GrFormNext />
          </Link>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  page: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  total: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default Pagination

const NO_PAGE = 5;
const MIDDLE_PAGE = 2
const __getPaginationPages = (total, page) => {
  const TOTAL = total + 1
  const active_page = Math.max(page, 1)
  if(total <= NO_PAGE) return _.range(1, TOTAL)

  const rightDot = (active_page + NO_PAGE) >= TOTAL
  if(rightDot){
    const rangeValue = _.range(total-NO_PAGE, TOTAL)
    return [1, '...', ...rangeValue]
  } 

  const leftRightDot = (active_page - NO_PAGE) >= 0 && (active_page + NO_PAGE) < TOTAL;
  if(leftRightDot){
    const rangeValue = _.range(active_page-MIDDLE_PAGE, active_page+MIDDLE_PAGE+1)
    return [1, '...', ...rangeValue, '...', total]
  }

  const leftDot = active_page >= NO_PAGE && (active_page + NO_PAGE) === total
  if(leftDot){
    return [1, '...', ...(_.range(active_page, TOTAL))]
  }

  return [..._.range(1, 6), '...', total]
}