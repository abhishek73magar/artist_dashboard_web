import { FaPersonBreastfeeding, FaUser, FaUserPlus } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { _logout, selectUser } from "store/redcuer/UserStore";
import profile from 'assets/profile.webp'

const navList = [
  // { name: "Music", path: "/music", icon: <FaMusic />  },
  { name: "Artist", path: "/artist", icon: <FaPersonBreastfeeding />  },
  { name: "Users", path: "/user", icon: <FaUserPlus />  },
  { name: "Profile", path: "/profile", icon: <FaUser />  },

]

const Sidebar = () => {
  const location = useLocation()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const __logout = () => {
    return dispatch(_logout())
  }

  return (
    <aside className="py-5 h-screen w-[270px] fixed top-0 left-0 shadow-lg flex flex-col justify-between">
      <article>
        <div className="px-2 py-2 flex flex-col justify-center items-center gap-2">
          <div className="h-[150px] w-[150px] rounded-full border overflow-hidden">
            <img src={profile} alt="profile" className="w-full h-full object-center object-cover" />
          </div>
          <div className="font-bold capitalize text-xl text-primary">{user ? `${user.first_name} ${user.last_name}` : "Unknow User"}</div>
          {/* <div className="text-center text-slate-400">Hip hop artist</div> */}
        </div>

        <nav className="my-3">
          {navList.map(({ name, path, icon }, indx) => {
            return (
              <Link
                key={indx}
                className={`flex flex-row justify-start items-center gap-3 px-6 py-3 text-lg border-l-5 ${location.pathname.includes(path) ? "bg-slate-100  border-l-primary" : "border-transparent hover:bg-slate-100 hover:border-l-primary"} transition-all duration-500`}
                to={path}
              >
              <div>{icon}</div>
              <div>{name}</div>
              </Link>
            )
          })}
        </nav>
      </article>

      <div onClick={__logout} className="max-w-[60%] w-full mx-auto rounded-lg  px-4 py-2.5 bg-primary text-white cursor-pointer flex flex-row justify-center items-center gap-3 text-lg hover:bg-primary/70 transition-all">
        <TbLogout className="text-2xl" />
        <div className="font-bold">Logout</div>
      </div>
    </aside>
  )
}

export default Sidebar