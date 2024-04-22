import React from "react";
import SingleCard from "../components/reuseable/SingleCard";
import MileChart from "../charts/MileChart";
import PredictionChart from "../charts/PredictionChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";
import recommendCarsData from "../assets/dummy-data/recommendCars";

const carObj = {
  title: "Total Vehicls Per Day",
  totalNumber: 3000,
  icon: "ri-police-car-line",
};

const tripObj = {
  title: "Register Parking",
  totalNumber: 50,
  icon: "ri-steering-2-line",
};

const clientObj = {
  title: "Users",
  totalNumber: "85k",
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Totall Slots",
  totalNumber: 1000,
  icon: "ri-timer-flash-line",
};

const Dashboard = () => {
  return (
    <div style={{ marginTop: "100px", padding: "0px 30px", paddingBottom: "50px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", columnGap: "2rem" }}>
        <SingleCard item={carObj} />
        <SingleCard item={tripObj} />
        <SingleCard item={clientObj} />
        <SingleCard item={distanceObj} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", columnGap: "2rem", marginTop: "2rem" }}>
        <div style={{ background: "var(--primary-color)", padding: "30px", borderRadius: "5px", height: "320px", paddingBottom: "50px" }}>
          <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "500", marginBottom: "20px" }}>User Statistics</h3>
          <MileChart />
        </div>
        <div style={{ background: "var(--primary-color)", padding: "30px", borderRadius: "5px", height: "320px", paddingBottom: "50px" }}>
          <h3 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "500", marginBottom: "20px" }}>Parking Statistics</h3>
          <PredictionChart />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", marginTop: "2rem", columnGap: "2rem" }}>
        {recommendCarsData.map((item) => (
          <RecommendCarCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
