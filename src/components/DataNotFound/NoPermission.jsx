import noPermission from 'assets/no-permission.png'

const NoPermission = () => {
  return (
    <article className='flex flex-col justify-center items-center gap-2 max-h-[50vh] min-h-[400px] rounded-md'>
      <div className='h-[90px] w-fit'>
        <img src={noPermission} alt='no-permission' className='w-full h-full object-contain' />
      </div>
      <div className='text-2xl text-primary'>Sorry, you cannot view this page.</div>
      <div className='text-red-400 text-lg'>No permission to access this page.</div>
      <div className='text-red-400 text-lg'>To access, please contact the administrator.</div>
    </article>
  )
}

export default NoPermission