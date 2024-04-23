import React, { useEffect, useState } from "react";
import ApexCharts from 'apexcharts'

const ApexChart = () => {
  const [userRegistrationData, setUserRegistrationData] = useState([]);

  useEffect(() => {
    // Fetch user registration data
    const fetchUserRegistrationData = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          console.error("Token not found.");
          return;
        }
        const headers = {
          Authorization: `Bearer ${token}`,
          // Add other headers if necessary
        };
        const response = await fetch("http://localhost:5001/api/auth/user_details", {
          method: "GET",
          headers: headers,
        });
        const data = await response.json();
        setUserRegistrationData(data);

        // Calculate user count for each day
        const userCountsByDay = {};
        data.forEach(user => {
          const date = new Date(user.created_at).toISOString().split('T')[0];
          userCountsByDay[date] = (userCountsByDay[date] || 0) + 1;
        });
        
        // Log user count for each day
        console.log("User Count for Each Day mile chart:", userCountsByDay);
        
        // Render chart with options
        renderChart(userCountsByDay);
      } catch (error) {
        console.error("Error fetching user registration data:", error);
      }
    };

    fetchUserRegistrationData();
  }, []);

  // Function to render chart with options
  const renderChart = (userCountsByDay) => {
    // Extract dates and counts from userCountsByDay
    const dates = Object.keys(userCountsByDay);
    const counts = Object.values(userCountsByDay);

    // Format dates to show only date and month (MM/DD)
    const formattedDates = dates.map(date => {
      const [month, day] = date.split('-').slice(1);
      return `${month}/${day}`;
    });

    // Render chart with options
    var options = {
      chart: {
        type: 'bar',
        height: 350,
      },
      series: [{
        name: 'User Count',
        data: counts
      }],

      xaxis: {
        type: 'category',
        categories: formattedDates
      },

      // Specify the colors of the bars
      colors: ['#344E41'], // Change the color here
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  };

  return (
    <div id="chart">
    </div>
  );
}

export default ApexChart;
