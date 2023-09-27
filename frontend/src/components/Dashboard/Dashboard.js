import React, { useEffect, useState, useRef } from "react";
import { axiosInstance } from "../../axios.config";
import CountUp, { useCountUp } from "react-countup";
import ApexChart1 from "./ApexChart1";
import ApexChart2 from "./ApexChart2";
import ApexBarChart from "./ApexBarChart";
import PieChart from "./PieChart";
import { GiCorn } from "react-icons/gi";
const defaultMaps = [
  {
    _id: "MH",
    numberOfValue: 24,
  },
  {
    _id: "GJ",
    numberOfValue: 46,
  },
  {
    _id: "TN",
    numberOfValue: 44,
  },
  {
    _id: "KA",
    numberOfValue: 120,
  },
  {
    _id: "PB",
    numberOfValue: 10,
  },
  {
    _id: "TS",
    numberOfValue: 80,
  },
  {
    _id: "WB",
    numberOfValue: 60,
  },
  {
    _id: "OD",
    numberOfValue: 35,
  },
];

const defaultPlants = {
  legends: [
    "Corn_(maize)",
    "Tomato",
    "Potato",
    "Grape",
    "Pepper bell",
    "Strawberry",
    "Apple",
  ],
  data: [2, 5, 4, 1, 7, 1, 4],
};

const defaultDisease = {
  legends: [
    "Apple Black rot",
    "Apple scab",
    "Potato Early blight",
    "Grape Black rot",
    "Tomato Septoria leaf spot",
    "Tomato Target Spot",
    "Corn Common rust",
    "Strawberry Leaf scorch",
    "Pepper_bell Bacterial spot",
  ],
  data: [2, 2, 4, 1, 4, 1, 2, 1, 7],
};

function Dashboard() {
  const [mapData, setMapData] = useState(defaultMaps);
  const [plantData, setPlantData] = useState(defaultPlants);
  const [diseaseData, setDiseaseData] = useState(defaultDisease);

  useEffect(() => {
    let componentMounted = true;

    const getData = async () => {
      const res = await axiosInstance.get("/dashboard");
      const data = res.data;
      if (!data) return;

      componentMounted && setMapData(data.mapData);

      componentMounted && setDiseaseData(data.diseaseData);
      componentMounted && setPlantData(data.plantData);
    };

    getData();

    return () => {
      componentMounted = false;
    };
  }, []);

  return (
    <div>
      <h2 className="text-5xl font-semibold text-center my-5">Dashboard</h2>

      <div className="rounded-xl m-2 shado shadow-slate-900w-xl p-4 flex items-stretch justify-evenly gap-2">
        <div className="flex flex-col p-4 rounded-xl bg-gradient-to-r from-green-700 to-emerald-300 text-white shadow-xl shadow-slate-300">
          <p className="text-center flex justify-center">
            <span className="text-6xl font-bold font-mono my-auto">
              <CountUp end={527} />
            </span>
          </p>
          <p className="text-center">
            <span className="text text-3xl font-mono"> Total Visitors</span>
          </p>
        </div>
        <div className="flex flex-col p-4 rounded-xl bg-gradient-to-r from-sky-700 to-slate-600 text-white shadow-xl shadow-slate-300">
          <p className="text-center flex justify-center">
            <span className="text-6xl font-bold font-mono my-auto">
              <CountUp end={261} />
            </span>
          </p>
          <p className="text-center">
            <span className="text text-3xl font-mono">Total Predictions</span>
          </p>
        </div>
        <div className="flex flex-col p-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-xl shadow-slate-300">
          <p className="text-center flex justify-center">
            <span className="text-5xl font-bold font-mono my-auto">
              <GiCorn className="inline" /> Corn
            </span>
          </p>
          <p className="text-center">
            <span className="text text-3xl font-mono">
              Plant With most <br /> Diseases Today
            </span>
          </p>
        </div>
        <div className="flex flex-col p-4 rounded-xl bg-gradient-to-r from-red-700 to-pink-400 text-white shadow-xl shadow-slate-300">
          <p className="text-center flex justify-center">
            <span className="text-6xl font-bold font-mono my-auto">
              <CountUp end={17} />
            </span>
          </p>
          <p className="text-center">
            <span className="text text-3xl font-mono">
              Predictions done <br /> Today
            </span>
          </p>
        </div>

        <div></div>
      </div>
      <div className="grid grid-rows-2 grid-flow-col">
        <div className="row-span-2 col-span-12 rounded-xl m-2 shadow-xl grid grid-cols-12 grid-flow-row gap-8">
          <div className=" rounded-xl shadow-xl shadow-slate-300 col-span-6">
            <h1 className="text-center p-6">Plant Affected by Diseases</h1>
            <ApexBarChart />
          </div>
          <div className=" rounded-xl shadow-xl shadow-slate-300 col-span-6">
            <h1 className="text-center p-6">Disease Detection by Month</h1>
            <ApexChart1 />
          </div>
          <div className=" rounded-xl shadow-xl shadow-slate-300 row-span-2 col-span-4">
            <h1 className="text-center p-6">
              Distribution of Prediction over plants
            </h1>
            <PieChart />
          </div>
          <div className=" rounded-xl shadow-xl shadow-slate-300 row-span-2 col-span-4">
            <h1 className="text-center p-6">Disease Detection by Day</h1>
            <ApexChart2 />
          </div>
          <div className=" rounded-xl shadow-xl shadow-slate-300 row-span-2 col-span-4 ">
            <h1 className="text-center p-6">Disease per State</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
