import { RenderIfFalse, RenderIfTrue } from "@/utils";
import { Link } from "@inertiajs/inertia-react";
import FeatherIcon from "feather-icons-react";
import { isNull } from "lodash";

const Navbar = ({ data }) => {
  const { auth } = data;

  return (
    <nav className="navbar fixed right-0 z-[999] left-0 top-0 text-white bg-success px-4 flex items-center">
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex="0"
            className="btn bg-transparent hover:bg-transparent border-none outline-none btn-circle avatar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-7 h-7 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-md w-52 text-slate-900"
          >
            <li>
              <Link href="/">All Articles</Link>
            </li>
            <li>
              <Link href="/">Latest Articles</Link>
            </li>
            
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="normal-case text-xl md:text-2xl">
          Laravel Inertia Blog
        </Link>
      </div>
      <div className="navbar-end">
        <RenderIfTrue isTrue={auth?.user === null}>
          <Link
            href={route("login")}
            className="btn bg-transparent hover:bg-transparent outline-none border-none flex justify-center items-center"
          >
            <FeatherIcon icon="log-in" size={23} />
          </Link>
        </RenderIfTrue>
        <RenderIfFalse isFalse={auth?.user === null}>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="m-1 cursor-pointer">
              <div className="avatar">
                <div className="w-[34px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      !isNull(auth?.user?.avatar)
                        ? `/storage/${auth?.user?.avatar}`
                        : "/storage/profile-images/defaultavatar.png"
                    }
                  />
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu menu-compact p-2 shadow bg-base-100 rounded-md w-52 text-slate-900"
            >
              <li>
                <Link href={route("dashboard")}>My Dashboard</Link>
              </li>
              <li>
                <Link href={route("logout")} method="post">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </RenderIfFalse>
      </div>
    </nav>
  );
};

export default Navbar;
