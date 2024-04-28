import React from "react";
import Dashboard from "./Dashboard";
const sampleData = {
  labels: ["January", "February", "March", "April", "May"],
  cases: [1000, 2000, 5000, 10000, 20000],
};
const DashboardHome = () => {
  return <Dashboard data={sampleData} />;
};

export default DashboardHome;
