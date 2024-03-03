import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import leaf from "../../assets/images/sprout.png";

function Navbar() {
  return (
    <Disclosure
      as="nav"
      className="bg-white shadow-md"
      style={{ zIndex: "10" }}
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/">
                  <img
                    className="block h-10 w-auto"
                    src={leaf}
                    alt="test logo"
                  />
                </Link>
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/forum"
                    className="text-black hover:text-gray-400 px-3 py-2 font-medium text-md"
                    aria-current="page"
                  >
                    Diseases Detection
                  </Link>
                  <Link
                    to="/dashbord"
                    className="text-black hover:text-gray-400 px-3 py-2 font-medium text-md"
                    aria-current="page"
                  >
                    Dashbord{" "}
                  </Link>
                  <Link
                    to="/UserProfile"
                    className="text-black hover:text-gray-400 px-3 py-2 font-medium text-md"
                    aria-current="page"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/"
                    className="text-black hover:text-gray-400 px-3 py-2 font-medium text-md"
                    aria-current="page"
                  >
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

export default Navbar;
