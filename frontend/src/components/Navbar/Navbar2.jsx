import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import leaf from "../../assets/images/sprout.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  console.log(user);
  const { t } = useTranslation();

  // Define your custom navigation items here
  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "User Profile", href: "/profile", current: false }, // Add custom title for user profile
    { name: "Disease Detection", href: "/disease", current: false }, // Add custom title for disease detection
    { name: "Logout", href: "#", current: false }, // Add custom title for logout
    { name: "Dashboard", href: "/dashboard", current: false }, // Add custom title for dashboard
  ];

  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-md"
      style={{ zIndex: "10" }}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <span>
                    <Link to="/">
                      <img
                        className="block h-10 w-auto"
                        src={leaf}
                        alt="test logo"
                      />
                    </Link>
                  </span>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item, key) => {
                      // Render NavLink only if user is logged in or item is not for logged in users
                      if (user || key === 0) {
                        return (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={({ isActive }) =>
                              `${
                                isActive
                                  ? "text-emerald-400 border-b-2 border-emerald-400"
                                  : "text-black hover:text-gray-400"
                              } px-3 py-2 font-medium text-md`
                            }
                          >
                            {item.name}
                          </NavLink>
                        );
                      }
                      return null; // Skip rendering for items not applicable to non-logged in users
                    })}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {user ? (
                  <>
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              user.avatar ||
                              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            }
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      ></Transition>
                    </Menu>
                  </>
                ) : (
                  <Link
                    to="/auth"
                    className="border-emerald-500 border-2 text-emerald-500 px-3 py-2 rounded-xl text-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white hover:bg-emerald-500 hover:text-white"
                  >
                    {t("description.nav.6")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
