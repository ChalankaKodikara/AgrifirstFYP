import React, { useState, useEffect } from 'react';
import SingleCard from "../charts/SingleCard";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../UI/RecommendCarCard.jsx";
import MileChart from "../charts/MileChart";
import Navbar from "../Navbar/Navbar2.jsx";
import "./dashboard.css";

const Dashboard = () => {
  // Define recommendCarsData locally
  const recommendCarsData = [
    { id: 1, name: "Car 1", price: "$10000" },
    { id: 2, name: "Car 2", price: "$20000" },
    { id: 3, name: "Car 3", price: "$30000" },
    // Add more data as needed
  ];

  const [carObj, setCarObj] = useState({
    title: "Total registered users",
    totalNumber: 0,
    icon: "ri-police-car-line",
  });

  const tripObj = {
    title: "Total Diseaseses ",
    totalNumber: 50,
    icon: "ri-steering-2-line",
  };

  const clientObj = {
    title: "Users",
    totalNumber: "85k",
    icon: "ri-user-line",
  };

  const distanceObj = {
    title: "Totall Predictions",
    totalNumber: 1000,
    icon: "ri-timer-flash-line",
  };
  useEffect(() => {
    // Fetch user count from the backend API
    fetch('http://localhost:5001/api/auth/users') // Update the API endpoint accordingly
      .then(response => response.json())
      .then(data => {
        setCarObj(prevState => ({
          ...prevState,
          totalNumber: data.userCount // Assuming the response contains a property 'userCount' with the total user count
        }));
      })
      .catch(error => console.error('Error fetching user count:', error));
  }, []); // Run this effect only once on component mount


  return (
    <div>
      <Navbar />
      <div
        style={{
          marginTop: "100px",
          padding: "0px 30px",
          paddingBottom: "50px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            columnGap: "2rem",
          }}
        >
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "2rem",
            marginTop: "2rem",
          }}
        >
          <div
            style={{
              background: "var(--primary-color)",
              padding: "30px",
              borderRadius: "5px",
              height: "320px",
              paddingBottom: "50px",
            }}
          >
            <h3
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              User Statistics
            </h3>
            {/* <MileChart /> */}
            <MileChart />
          </div>
          <div
            style={{
              background: "var(--primary-color)",
              padding: "30px",
              borderRadius: "5px",
              height: "320px",
              paddingBottom: "50px",
            }}
          >
            <h3
              style={{
                color: "#fff",
                fontSize: "1.2rem",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              Parking Statistics
            </h3>
            <CarStatsChart />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            marginTop: "2rem",
            columnGap: "2rem",
          }}
        >
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
