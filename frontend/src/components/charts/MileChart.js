import React from "react";

import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

import mileStaticsData from "../dummy-data/carStatics";

const mileChart = () => {
  return (
    <ResponsiveContainer width="100%">
      <BarChart data={mileStaticsData}>
        <XAxis dataKey="name" stroke="#013220" />
        <Bar dataKey="mileStats" stroke="#013220" fill="#013220" barSize={30} />

        <Tooltip wrapperClassName="tooltip__style" cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default mileChart;
