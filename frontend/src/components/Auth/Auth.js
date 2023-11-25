import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import Signup from "./Signup";
import google from "./google.png";
import facebook from "./facebook.png";
import twitter from "./twitter.png";
import cropbg from "./background4.png";

import { useTranslation, Trans } from "react-i18next";
import LoginForm from "./LoginForm";
import SignupForm from "./signupform";

function Auth() {
  const { t, i18n } = useTranslation();
  const [enabled, setEnabled] = useState(false);
  return (
    <div
      className="grid grid-cols-4 h-full bg-blend-darken relative"
      style={{
        backgroundPosition: "center",
      }}
    >
      <div className="col-span-4 md:col-start-3 md:col-span-2 py-auto flex justify-center align-middle">
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
                {enabled ? t("description.auth.3") : t("description.auth.2")}
              </span>
              <span
                className={`ml-auto flex justify-center items-center h-full w-1/2 rounded-full transition duration-300 ease-in-out transform bg-transparent text-white`}
              >
                {t("description.auth.3")}
              </span>
            </span>
          </Switch>
        </div>
        <div className="row-span-4">
          {enabled ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}

export default Auth;
