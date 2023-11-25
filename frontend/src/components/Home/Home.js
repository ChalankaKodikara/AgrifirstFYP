import InfoSection from "./InfoSection/InfoSection";
import { homeObjOne, homeObjTwo, homeObjThree } from "./InfoSection/Data";
import bg1 from "../../assets/images/HomePage/smart-agriculture-iot-with-hand-planting-tree-background.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";
import { useTranslation, Trans } from "react-i18next";
import Navbar from "../Navbar/Navbar";

const Home = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };
  const { t, i18n } = useTranslation();
  homeObjOne["t"] = t("description.home", { returnObjects: true }).slice(0, 4);
  homeObjTwo["t"] = t("description.home", { returnObjects: true }).slice(4, 8);
  homeObjThree["t"] = t("description.home", { returnObjects: true }).slice(
    8,
    12
  );

  return (
    <>
    <div>
    <div><Navbar /></div>

      <div className="flex-row h-fit">
        <div className="col-span-12 h-fit">
          <div className="col-span-12 flex flex-row relative">
            <div
              className="bg-gradient-to-r bg-emerald-700 rounded-r-[900px] absolute h-full"
              style={{
                borderRadius: "54% 46% 100% 0% / 0% 100% 0% 100% ",
                width: "45%",
              }}
            ></div>
            <div
              className="bg-gradient-to-r bg-emerald-600 rounded-r-[900px] absolute h-full "
              style={{
                borderRadius: "45% 55% 100% 0% / 0% 100% 0% 100% ",
                width: "44%",
              }}
            ></div>
            <div className="absolute h-full px-6 md:px-0 md:w-1/4 text-white z-10 font-mono flex">
              <div className="my-auto ml-auto md:w-3/4 text-2xl flex flex-col">
                <p className="my-2 align text-center text-6xl font-extrabold text-cyan-900">
                  {t("description.heading.0")}
                </p>
                <p className="my-6 align text-justify">
                  {t("description.heading.1")}
                </p>
                <Link
                  to="/auth"
                  className="border rounded-full my-6 px-5 py-2 mx-auto hover:bg-white ease-in-out duration-300 hover:text-emerald-600 font-bold text-3xl truncate"
                  onMouseEnter={onHover}
                  onMouseLeave={onHover}
                >
                  {t("description.heading.2")}{" "}
                  {hover ? (
                    <MdArrowForward className="inline-block" />
                  ) : (
                    <MdKeyboardArrowRight className="inline-block" />
                  )}
                </Link>
              </div>
            </div>

            <div
              className="ml-auto basis-5/6"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.3)), url(" +
                  bg1 +
                  ")",
                backgroundPosition: "center",
                backgroundSize: "cover",
                height: "700px",
                backgroundRepeat: "no-repeat",
              }}
            ></div>
          </div>
        </div>
        
        <div className="col-span-12 h-fit">
          <InfoSection {...homeObjOne} />
        </div>
        <div className="col-span-12 h-fit">
          <InfoSection {...homeObjTwo} />
        </div>
        <div className="col-span-12 h-fit">
          <InfoSection {...homeObjThree} />
        </div>
      </div>
      </div>
    </>
  );
};

export default Home;
