import {
  Button,
  DarkThemeToggle,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import siteLogo from "../../assets/logo-icon.svg";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function NavbarComponent() {
  let { user, setUser} = useContext(UserContext);
  let navigate = useNavigate();
  function logout(){
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }
  return (
    <Navbar className="md:px-36 md:py-3 fixed top-0 left-0 right-0 z-50 dark:bg-purple-500/35">
      <NavbarBrand as={Link} to="/">
        <img src={siteLogo} className="mr-3 w-12" alt="Site Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white text-purple-600">
          Social Media
        </span>
      </NavbarBrand>
      <div className="flex items-center md:ml-auto">
        {user ? (
          <div className="flex items-center gap-4 userAvatar pt-2 md:pt-0">
            <img
              className="w-10 h-10 rounded-full"
              src={user.photo}
              alt=""
            />
            <div className="font-medium dark:text-white text-purple-600">
              <div>Hello {user.name}</div>
            </div>
            <NavLink
              as={NavLink}
              to="editProfile"
              className=" text-purple-600 dark:text-white md:p-3"
            >
              Edit Profile
            </NavLink>
            <i onClick={logout} className="fa-solid fa-right-from-bracket text-purple-600 dark:text-white cursor-pointer"></i>
          </div>
        ) : (
          <>
            <NavLink
              as={NavLink}
              to="login"
              className=" text-purple-600 md:border-2 md:border-purple-600 dark:border-white dark:text-white md:p-3 md:rounded-2xl"
            >
              Login
            </NavLink>
          </>
        )}
      </div>
      <DarkThemeToggle className="ml-5" />
    </Navbar>
  );
}
