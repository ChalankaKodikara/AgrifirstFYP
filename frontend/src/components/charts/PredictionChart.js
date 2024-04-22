import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Area,
} from "recharts";

import carStaticsData from "../dummy-data/carStatics";

const PredictionChart = () => {
  return (
    <ResponsiveContainer width="100%">
      <AreaChart
        data={carStaticsData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#43AC78" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" stroke="#C2F8CB" />

        <CartesianGrid strokeDasharray="0" stroke="#C2F8CB" />
        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
        <Area
          type="monotone"
          dataKey="week"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Area
          type="monotone"
          dataKey="prevWeek"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default PredictionChart;
