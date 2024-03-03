// frontend/src/components/CarStatsChart.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

const CarStatsChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchUserPredictions();
  }, []);

  const fetchUserPredictions = async () => {
    try {
      const response = await axios.get("http://localhost:3001/user_predictions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // Assuming token is stored in localStorage
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching user predictions:", error);
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
      >
        <XAxis dataKey="created_at" stroke="#ddd" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CarStatsChart;
