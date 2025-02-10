import moment from "moment";
import { GrEdit } from "react-icons/gr";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import TableContext from "./TableContext";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

export const TableHeading = ({ name, type }) => {
  const { checkAll, deleteAll, addNew, isEdit, disableDelete } = useContext(TableContext)
  if(type === 'checkbox') return <th className="table-p "><div className="flex flex-col justify-center items-center"><input type='checkbox' onChange={checkAll} className="" /></div> </th>
  if(type === 'image') return <th className='table-p w-[120px]'>{name}</th>
  if(type === 'action') return (
    <th className='px-3 text-center'>
      <div className="flex flex-row gap-2 justify-end items-center">
        {addNew && isEdit && <Link to={addNew} className="text-base cursor-pointer text-white text-opacity-80 hover:text-opacity-100" title="Add New"><FaPlus /></Link>}
        {deleteAll && !disableDelete && isEdit && <FaTrashAlt className="text-base cursor-pointer text-white text-opacity-80 hover:text-opacity-100" onClick={deleteAll} title="Delete All" />}
      </div>
    </th>)
  return <th className='table-p'>{name}</th>
}

TableHeading.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
}


const TableDataType = ({ sn, value, type, name, edit, checked, onDelete, onChange, disableDelete, disableEdit }) => {
  const { slug, subAdd } = useContext(TableContext)
  // console.log(context)

  if(type === 'sn') return <td className="table-p align-middle">{sn}</td>
  if(type === 'checkbox') return <td className="table-p w-[15px]"><input type="checkbox" name={name} value={value} checked={checked} onChange={onChange} /></td>
  if(!value && type !== 'action' && type !== 'image') return <td className="table-p">{""}</td>
  if(type === 'date-only') return <td className='table-p align-middle text-left'>{moment(value).format('YYYY-MM-DD')}</td>
  if(type === 'date-from-now') return <td className='table-p align-middle text-left'>{moment(value).fromNow()}</td>
  if(type === 'truncate') return <td className="table-p truncate max-w-[200px]">{value}</td>
  if(type === 'heading') return <td  className='table-p align-middle font-semibold'>{value}</td>
  if(type === 'action') {
    return (
        <td className='border-p w-[40px] align-middle' >
          <div className="text-lg flex flex-row justify-end items-center gap-1 text-gray-400 opacity-40 group-hover:opacity-100 group-hover:text-gray-700 cursor-pointer transition-all">
          {subAdd && name === 'parent' && <Link 
            to={subAdd.replace('{key}', edit)}
            className="flex flex-row justify-start items-center gap-1 p-1 hover:text-primary" 
            title="Edit"
          >
            <FaPlus />
          </Link>}
          {!disableEdit && <Link 
            to={`${slug}${edit}`} 
            className="flex flex-row justify-start items-center gap-1 p-1 hover:text-primary" 
            title="Edit"
          >
            <GrEdit />
          </Link>}
          {!disableDelete && <div 
            className="flex flex-row justify-start items-center gap-1 p-1 hover:text-primary" 
            title="Delete"
            onClick={() => onDelete(edit)}
          >
            <FaTrashAlt />
          </div>}
        </div>
        </td>
      )
    }
  return <td className='table-p align-middle'>{Array.isArray(value) ? value.join(', ') : value}</td>;
}

TableDataType.propTypes = {
  sn: PropTypes.any,
  value: PropTypes.any,
  type: PropTypes.string,
  base_url: PropTypes.string,
  edit: PropTypes.string,
  checked: PropTypes.bool,
  name: PropTypes.string,
  onDelete: PropTypes.func,
  onChange: PropTypes.func,
  disableDelete: PropTypes.bool,
  disableEdit: PropTypes.bool,
}

export default TableDataType
