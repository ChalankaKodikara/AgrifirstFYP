import { useEffect, useState, Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../../axios.config";
import { useNavigate } from "react-router-dom";
import LanguageSelector from "../LangaugeSelector";
import { useTranslation, Trans } from "react-i18next";
import leaf from "../../assets/images/sprout.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);
  const { t, i18n } = useTranslation();

  const navigation = [
    { name: t("description.nav.0"), href: "/", current: true },
    { name: t("description.nav.1"), href: "/dashboard", current: false },
    
    { name: t("description.nav.3"), href: "/teleconsulting", current: false },
  ];
  const handleLogout = async () => {
    await axiosInstance
      .get("/auth/logout")
      .then((response) => {
      })
      .catch((error) => {
        console.log(error.response);
      });
    navigate("/");
  };

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
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
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
                      if (!user && key > 1) return <></>;
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
                    })}
                  </div>
                </div>
              </div>
              <LanguageSelector />
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
                      >
                        <Menu.Items
                          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          style={{ zIndex: 2 }}
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                {t("description.nav.4")}
                              </a>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            <div
                              className={
                                "button block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-slate-100"
                              }
                              onClick={handleLogout}
                            >
                              {t("description.nav.5")}
                            </div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
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

                {/* Profile dropdown */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, key) => {
                if (!user && key > 1) return <></>;
                return (
                  <Disclosure.Button
                    key={item.name}
                    as={NavLink}
                    to={item.href}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-emerald-400 border-b-2 border-emerald-400"
                          : "text-black hover:text-gray-400"
                      } block px-3 py-2 rounded-md text-base font-medium`
                    }
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
