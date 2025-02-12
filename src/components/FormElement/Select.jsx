import useSelected from "hooks/useSelected"
import PropTypes from "prop-types"
import { memo, useEffect, useRef, useState } from "react"
import { HiOutlineSelector } from "react-icons/hi"
import { twMerge } from "tailwind-merge"
import { _sortByName } from "utils/_commanFunction"

const Select = ({ 
  label, list=[], option={}, name, value='', 
  onChange, placeholder, error, 
  sortBy, divClassName, labelClassName, isLoading,
  disabled=false, sort="startWith", disabledFirst=false
}) => {
  const [activeLabel] = useSelected(list, option, value)
  const [text, setText] = useState('')
  const debounceRef = useRef(null)
  const [toggle, setToggle] = useState(false)
  const selectRef = useRef(null)

  const __onChange = (value) => {
    if(onChange) onChange(name, value)
    return __toggleHandle(false)
  }

  const __inputHandle = (value) => {
    if(debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => setText(value.toLowerCase()), 300)
  }

  const __sortBy = (a, b) => {
    if(sortBy) return sortBy(a, b)
    return _sortByName(option?.label ?? 'label')(a, b)
  }

  const __filterBy = (item) => {
    if(text === '') return true
    const name = item[option?.label]
    if(sort === 'includes'){
      // search by text is included in name
      return name.toLowerCase().includes(text)
    }

    // search by starting text
    return name.toLowerCase().startsWith(text)
  }

  const __toggleHandle = (status) => {
    setText('')
    return setToggle(status || !toggle)
  }

  useEffect(() => {
    const handle = (e) => {
      if(selectRef.current && !selectRef.current.contains(e.target)){
        setToggle(false)
        setText('')
      }
    }
    window.addEventListener('mousedown', handle)
    return () => window.removeEventListener('mousedown', handle)
  }, [])

  return (
    <div className={twMerge("flex flex-col justify-start items-start gap-2 w-full text-base ", divClassName)}>
      {label && <div className={twMerge("text-black font-semibold w-full min-w-[140px] max-w-[140px]", labelClassName)}>{label}</div>}

      <div className="w-full relative" ref={selectRef}>
        <div onClick={() => __toggleHandle()} className={`border px-2 py-2  w-full rounded-md text-secondary flex flex-row justify-between items-center gap-2 cursor-pointer hover:ring-2 ${error ? "ring-2 ring-red-500" : "hover:ring-primary"} transition-all ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}`}>
          <div className="cursor-pointer line-clamp-1">{isLoading ? 'Loading...' : activeLabel ?? '--'}</div>
          <div className=""><HiOutlineSelector /></div>
        </div>
        {error && <div className='text-sm italic text-red-500 px-1'>{error}</div>}

        {!disabled && toggle && <div className={`absolute border top-12 w-[100%] min-w-[200px] text-base bg-white rounded-md shadow-lg ${toggle ? "scale-100" : "scale-0"} transition-all`} style={{ zIndex: 6000 }}>
          <div className="px-2 py-2">
            <input 
              type="search"
              className="w-full px-3 py-2 outline-none ring-1 ring-[#ddd] rounded-md focus:ring-2 focus:ring-primary"
              placeholder={placeholder ?? `Search ${label ?? ""}`}
              // autoFocus={true}
              ref={ref => ref && ref.focus()}
              onChange={(e) => __inputHandle(e.target.value)}
            />
          </div>
          <ul className="max-h-[250px] overflow-auto pb-2">
            {!disabledFirst && <li className="px-4 py-1 hover:bg-primary/30 cursor-pointer" onClick={() => __onChange('')}>--</li>}
            {Array.isArray(list) && 
            list
              .sort(__sortBy)
              .filter(__filterBy)
              .map((item, indx) => {
              const optionLabel = item[option?.label]
              const optionValue = item[option?.value]

              return (
                <li 
                  key={indx} 
                  onClick={() => __onChange(optionValue)}
                  className={`truncate px-4 py-1 cursor-pointer ${optionValue === value ? 'bg-primary/30' : 'hover:bg-primary/30'}`}
                  tabIndex={indx}
                >
                  {optionLabel} 
                </li>
              )
            })}
          </ul>
        </div>}
      </div>
    </div>
  )
}


Select.propTypes = {
  label: PropTypes.string,
  divClassName: PropTypes.string,
  labelClassName: PropTypes.string,
  list: PropTypes.array.isRequired,
  option: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  sortBy: PropTypes.func,
  sort: PropTypes.exact("startWith", "includes"),
  error: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  disabledFirst: PropTypes.bool,
}

export default memo(Select)