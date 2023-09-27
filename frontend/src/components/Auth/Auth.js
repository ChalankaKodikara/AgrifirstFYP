import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import Login from "./Login";
import Signup from "./Signup";
import google from "./google.png";
import facebook from "./facebook.png";
import twitter from "./twitter.png";
import cropbg from "./background4.png";

import { useTranslation, Trans } from "react-i18next";

function Auth() {
  const { t, i18n } = useTranslation();
  const [enabled, setEnabled] = useState(false);
  return (
    <div
      className="grid grid-cols-4 h-full bg-blend-darken relative"
      style={{
        backgroundImage: "url(" + cropbg + ")",
        backgroundPosition: "center",
        // backgroundSize: "cover",
        // backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="bg-gradient-to-r bg-emerald-700 rounded-r-[900px] absolute h-full "
        style={{
          borderRadius: "54% 46% 100% 0% / 0% 100% 0% 100% ",
          width: "45%",
        }}
      ></div>
      <div
        className="bg-gradient-to-r bg-emerald-600 rounded-r-[900px] absolute h-full"
        style={{
          borderRadius: "45% 55% 100% 0% / 0% 100% 0% 100% ",
          width: "44%",
        }}
      ></div>
      <div className="col-span-4 md:col-start-3 md:col-span-2 py-auto flex justify-center align-middle">
        <div
          className="mx-auto w-5/6 sm:w-1/2 md:w-3/5 xl:w-1/2 my-auto "
          style={{ zIndex: "1" }}
        >
          <div className="grid grid-rows-6 grid-flow-col gap-4 h-1/2 rounded-lg border-1 bg-slate-800 bg-opacity-90 border-black px-4">
            <div className="row-span-1 flex justify-center">
              <Switch checked={enabled} onChange={setEnabled}>
                <span className="bg-gray-500 rounded-full h-10 w-48 flex relative shadow-inner shadow-black">
                  <span
                    className={`mr-auto flex justify-center items-center h-full w-1/2 rounded-full transition duration-300 ease-in-out transform bg-transparent text-white`}
                  >
                    {t("description.auth.2")}
                  </span>
                  <span
                    className={`absolute flex justify-center items-center h-full w-1/2 rounded-full transition duration-300 ease-in-out transform bg-emerald-500 text-white ${
                      enabled ? " translate-x-full" : ""
                    }`}
                  >
                    {enabled
                      ? t("description.auth.3")
                      : t("description.auth.2")}
                  </span>
                  <span
                    className={`ml-auto flex justify-center items-center h-full w-1/2 rounded-full transition duration-300 ease-in-out transform bg-transparent text-white`}
                  >
                    {t("description.auth.3")}
                  </span>
                </span>
              </Switch>
            </div>
            <div className="row-span-4">{enabled ? <Login /> : <Signup />}</div>
            <div className="row-span-1 ">
              <hr />
              <div className="grid grid-cols-12 content-around p-4">
                <div className="col-span-4 cursor-pointer hover:opacity-75">
                  <img
                    src={google}
                    alt="Google Logo"
                    className="h-10 mx-auto"
                  />
                </div>
                <div className="col-span-4 cursor-pointer hover:opacity-75">
                  <img
                    src={facebook}
                    alt="Facebook Logo"
                    className="h-10 mx-auto"
                  />
                </div>
                <div className="col-span-4 cursor-pointer hover:opacity-75">
                  <img
                    src={twitter}
                    alt="Twitter Logo"
                    className="h-10 mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
