import React, { useState, useEffect } from "react";
import SingleCard from "../charts/SingleCard";
import PredictionChart from "../charts/PredictionChart";
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

  const [userCount, setUserCount] = useState(0);
  const [diseaseCount, setDiseaseCount] = useState(0);
  const [predictionCount, setPredictionCount] = useState(0); // New state for prediction count
  const [userRegistrationData, setUserRegistrationData] = useState([]);

  useEffect(() => {
    // Retrieve the token from local storage or secure cookie
    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("Token not found.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      // Add other headers if necessary
    };

    // Fetch user count
    fetch("http://localhost:5001/api/auth/user_details", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setUserCount(data.length);
      })
      .catch((error) => console.error("Error fetching user count:", error));

    // Fetch disease count
    fetch("http://localhost:5001/api/auth/diseases", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setDiseaseCount(data.length);
      })
      .catch((error) => console.error("Error fetching disease count:", error));

    // Fetch prediction count
    fetch("http://localhost:5001/api/auth/user_predictions", {
      method: "GET",
      headers: headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setPredictionCount(data.length);
      })
      .catch((error) =>
        console.error("Error fetching prediction count:", error)
      );
  }, []);


  // // Fetch user registration data and calculate user count by day
  // useEffect(() => {
  //   // Retrieve the token from local storage or secure cookie
  //   const token = localStorage.getItem("authToken");

  //   if (!token) {
  //     console.error("Token not found.");
  //     return;
  //   }

  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     // Add other headers if necessary
  //   };

  //   fetch("http://localhost:5001/api/auth/user_details", {
  //     method: "GET",
  //     headers: headers,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUserRegistrationData(data);

  //       // Calculate user count for each day
  //       const userCountsByDay = {};
  //       data.forEach(user => {
  //         const date = new Date(user.created_at).toISOString().split('T')[0];
  //         userCountsByDay[date] = (userCountsByDay[date] || 0) + 1;
  //       });
        
  //       // Log user count for each day
  //       // console.log("User Count for Each Day:", userCountsByDay);
  //     })
  //     .catch((error) =>
  //       console.error("Error fetching user registration data:", error)
  //     );
  // }, []);

  

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
          <SingleCard
            item={{
              title: "Total registered users",
              totalNumber: userCount,
              icon: "ri-police-car-line",
            }}
          />
          <SingleCard
            item={{
              title: "Total Diseaseses ",
              totalNumber: diseaseCount,
              icon: "ri-steering-2-line",
            }}
            style={{ color: "#fff" }} // Set the font color to white
          />

          <SingleCard
            item={{
              title: "Users",
              totalNumber: userCount,
              icon: "ri-user-line",
            }}
          />
          <SingleCard
            item={{
              title: "Totall Predictions",
              totalNumber: predictionCount,
              icon: "ri-timer-flash-line",
            }}
          />
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
                color: "#344E41",
                fontSize: "1.2rem",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              User Statistics
            </h3>
            <div
             style={{
              marginBottom: "10px",
            }}>            <MileChart />
</div>
          </div>
          <div
            style={{
              background: "var(--primary-color)",
              padding: "30px",
              borderRadius: "5px",
              height: "320px",
              paddingBottom: "50px",
            }}
          >x
            <h3
              style={{
                color: "#344E41",
                fontSize: "1.2rem",
                fontWeight: "500",
                marginBottom: "20px",
              }}
            >
              Prediction Statistics
            </h3>
            <PredictionChart />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            marginTop: "200px",
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
