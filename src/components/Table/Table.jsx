import { memo, useContext, useRef, useState } from 'react'
import Spinner from 'components/Spinner/Spinner';
import TableDataType, { TableHeading } from './TableDataType';
import DataNotFound from 'components/DataNotFound/DataNotFound';
import { twMerge } from 'tailwind-merge';
import useCheckPermission from 'hooks/useCheckPermission';
import TableContext from './TableContext';
import { _sortByName } from 'utils/_commanFunction';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';
// const colnames = [
//   { name: "Name", key: "name"},
//   { name: "Position", key: "position"},
//   { name: "Office", key: "office"},
//   { name: "age", key: "15"},
//   { name: "start date", key: "2024-01-04T10:00:00.000Z", type: 'datetime' },
//   { name: "salary", key: "1000", type: 'currency'},
// ]

const Table = ({ 
  colnames, data, searchBy, slug, title,
  isLoading=true, edit='id', 
  disableEdit=false, onClick=()=>{}, onDelete=()=>{}, 
  deleteAll, serachBox=false, className, tableClassName, disableDelete=false,
  resource, sortBy, sortKey, addNew,
  ARRAY_SIZE=80
}) => {
  const [search, setSearch] = useState("")
  const [ids, setIds] = useState([])
  const [, isEdit] = useCheckPermission(resource)

  const __checkAllCheckbox = (e) => {
    const { checked } = e.target
    if(Array.isArray(data) && checked){
      const dd = data.filter(__filterBy)
      const { key } = colnames.find(({ type }) => type === 'checkbox')
      if(key) setIds(dd.map(i => i[key]))
    } else setIds([])
  }

  const __checkboxHandle = (e) => {
    const { value, checked } = e.target;
    setIds((prev) => {
      if(checked && !prev.includes(value)) return [...prev, value]
      if(!checked && prev.includes(value)) return prev.filter(id => +id !== +value)
      return prev;
    })
  }

  const __filterBy = (item) => {
    if(search === '' || !searchBy) return true;
    if(Array.isArray(searchBy)){
      return searchBy.some((key) => item[key] && item[key].toString().toLowerCase().startsWith(search))
    } 
    return item[searchBy].toString().toLowerCase().startsWith(search)
  }
  
  const __sortBy = (a, b) => {
    if(sortBy) return sortBy(a, b)
    if(!sortKey) return 1;
    return _sortByName(sortKey)(a, b)
  }

  return (
    <TableContext.Provider value={{ 
      slug, ids, edit, onDelete, onClick, __checkboxHandle, 
      colnames, addNew, isEdit, ARRAY_SIZE,
      disableEdit: disableEdit ? disableEdit : !isEdit, 
      disableDelete: disableDelete ? disableDelete : !isEdit, 
      deleteAll: deleteAll ? () => deleteAll(ids).then(() => setIds([])) : null, 
      checkAll: __checkAllCheckbox,
    }}>
    <div className={twMerge('text-base', className)}>
      {(Searchbox) && <div className='flex flex-row justify-end items-center gap-4 px-2 py-2 bg-white'>
        {serachBox && <Searchbox setValue={setSearch} />}
      </div>}
      {title && <div className='text-center text-lg font-mono mb-0.5'>{title}</div>}
      <div className={twMerge('pb-12 overflow-x-auto', tableClassName)}>
        <table className='w-full text-left text-text'>
          <thead>
            <tr className='capitalize border-b bg-primary text-white z-10 sticky top-0'>
            {Array.isArray(colnames) && colnames.map(({ name, type }, indx) => {
              if(type === 'action' && ((disableDelete && disableEdit) || !isEdit)) return null;
              if(type === 'checkbox') return <TableHeading key={indx} type={type} />
              return <TableHeading key={indx} name={name} type={type} />
            })}
            </tr>
          </thead>
          
          <tbody>
          {!isLoading ? !Array.isArray(data) || data.length === 0 ? <tr><td colSpan={Array.isArray(colnames) ? colnames.length : 1}><DataNotFound className='min-h-[150px]' /> </td></tr>:
            data.filter(__filterBy).sort(__sortBy).map((item, indx) => {
              return <TableRow key={indx} item={item} sn={indx+1} />
            })
          : null}
          </tbody>
        </table>
      </div>
      {isLoading ? <Spinner /> : null}
    </div>
    </TableContext.Provider>
  )
}

Table.propTypes = {
  colnames: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  ARRAY_SIZE: PropTypes.number,
  statusKey: PropTypes.string,
  searchBy: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  slug: PropTypes.string,
  title: PropTypes.string,
  isLoading: PropTypes.bool,
  edit: PropTypes.string,
  disableEdit: PropTypes.bool,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  deleteAll: PropTypes.func,
  serachBox: PropTypes.bool,
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  disableDelete: PropTypes.bool,
  resource: PropTypes.string,
  sortBy: PropTypes.func,
  sortKey: PropTypes.string,
  addNew: PropTypes.string,
}
export default memo(Table)

const TableRow = ({ item, sn }) => {
  const { edit, ids, onDelete, __checkboxHandle, isEdit, disableDelete, disableEdit, colnames, onClick  } = useContext(TableContext)
  const _value = (key) => {
    const keyName = key.split('.')
    if(keyName.length === 1) return item[key] // return if key is not nested

    let vv = null;
    keyName.forEach((kk) => {
      if(vv === null) vv = item[kk]
      else if(vv && vv[kk]) vv = vv[kk]
    })
    return vv;
  }
  return (
    <tr className='group even:bg-primary/10 hover:bg-primary/20 cursor-pointer' onClick={() => onClick(item)}>
      {colnames.map(({ key, type }, __indx) => {
        if(type === 'action' && ((disableDelete && disableEdit) || !isEdit)) return null;
        return (
          <TableDataType 
            key={__indx}
            sn={sn}
            value={_value(key)}
            type={type}
            edit={item[edit]}
            checked={ids.some(id => +id === +item[key])}
            onDelete={onDelete}
            onChange={__checkboxHandle}
            disableDelete={disableDelete ? disableDelete : !isEdit}
            disableEdit={disableEdit ? disableEdit : !isEdit}
          />
        )
      })}
    </tr>
  )
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  sn: PropTypes.number,
}

const Searchbox = ({ setValue, ...inputProps }) => {
  const [text, setText] = useState("")
  const interval = useRef()
  const __onChange = (e) => {
    const value = e.target.value
    setText(value)
    if(interval.current) clearTimeout(interval.current)
    interval.current = setTimeout(() => setValue(value), 500)
  }
  return (
    <div className='border px-2 py-2 min-w-[250px] flex flex-row items-center justify-start group focus-within:ring-2 ring-primary focus-within:text-primary transition-all '>
      <input type='text' className={twMerge('flex-1 outline-none text-base px-2 text-secondary')} placeholder='Search' value={text} onChange={__onChange} {...inputProps} />
      <FaSearch className='text-lg cursor-pointer' />
    </div>  
  )
}

Searchbox.propTypes = {
  setValue: PropTypes.func
}