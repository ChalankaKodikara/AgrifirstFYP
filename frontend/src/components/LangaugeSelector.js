import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useTranslation, Trans } from "react-i18next";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const lngs = {
  EN: { nativeName: "English" },
  // ह: { nativeName: "Hindi" },
  // म: { nativeName: "Marathi" },
  SI: { nativeName: "Sinhala" },
  TA: { nativeName: "Tamil" },
};

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();
  const [activeLanguage, setActiveLanguage] = useState(
    i18n.resolvedLanguage.toUpperCase()
  );
  const changeLanguage = (lng) => {
    setActiveLanguage(lng.toUpperCase());
    i18n.changeLanguage(lng);
  };
  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div>
        <Menu.Button className="w-10 h-10 rounded-full border border-green-500 shadow-sm px-4 py-2 bg-white text-sm font-medium text-green-500 hover:bg-emerald-400 hover:text-sky-800 flex justify-center items-center">
          <span>{activeLanguage}</span>
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {Object.keys(lngs).map((lng) => (
              <Menu.Item key={lng} onClick={() => changeLanguage(lng)}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {lngs[lng].nativeName}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
