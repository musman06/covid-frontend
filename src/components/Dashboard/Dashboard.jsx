import React from "react";
import BarGraph from "./BarGraph";

function Dashboard({ data }) {
  return (
    <div>
      <h1>COVID-19 Dashboard</h1>
      <BarGraph />
    </div>
  );
}

export default Dashboard;
