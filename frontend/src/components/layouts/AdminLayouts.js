import { NavLink, Navigate, Outlet } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { useAuth } from "../../store/auth";

const AdminLayouts = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <header className="fixed left-0 top-0 h-full w-[8%] bg-gray-800 text-white  transition-all duration-300 hover:w-40">
        <nav className="flex flex-col justify-center h-full">
          <ul className="text-center  ">
            <li className="my-6 flex justify-center items-cente  p-5r">
              <NavLink
                to="/admin/users"
                // activeClassName="text-blue-500"
                className="flex gap-3"
              >
                <FaUser className="mx-[1px]" />
                <span className="text-xs">Users</span>
              </NavLink>
            </li>
            {/* <li className="my-6 flex justify-center items-center  p-5">
              <NavLink
                to="/admin/contacts"
                // activeClassName="text-blue-500"
                className="flex gap-"
              >
                <FaPhone className="mx-[15px]" />
                <span className="text-xs ">Contacts</span>
              </NavLink>
            </li> */}
            <li className="my-6 flex justify-center items-center  p-5">
              <NavLink
                to="/"
                // activeClassName="text-blue-500 "
                className="flex gap-3"
              >
                <FaHome className="" />
                <span className="text-xs">Home</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <Outlet />
    </>
  );
};

export default AdminLayouts;
//                   <Link to={`/admin/users/${currUser._id}/edit`}>Edit</Link>
