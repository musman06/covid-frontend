import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { BarChart } from "@mui/x-charts/BarChart";
import React, { useEffect, useState } from "react";

const formatMonthYear = (input) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, month] = input.split("-");
  return `${monthNames[parseInt(month) - 1]} '${year.slice(2)}`;
};

const parseChartData = (data) => {
  let seriesData = {};
  let months = [];
  let countryColorIndex = 0;
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];
  const countryColors = {};

  data.forEach((item) => {
    const monthYear = formatMonthYear(item.month_and_year);
    if (!months.includes(monthYear)) {
      months.push(monthYear);
    }

    const countryKey = item.location.toLowerCase().replace(/ /g, "");
    if (!countryColors[countryKey]) {
      countryColors[countryKey] = {
        cases: colors[countryColorIndex % colors.length],
        deaths: colors[(countryColorIndex + 1) % colors.length],
      };
      countryColorIndex += 2;
    }

    const casesKey = countryKey + "-cases";
    const deathsKey = countryKey + "-deaths";

    if (!seriesData[casesKey]) {
      seriesData[casesKey] = {
        data: [],
        color: countryColors[countryKey].cases,
      };
    }
    if (!seriesData[deathsKey]) {
      seriesData[deathsKey] = {
        data: [],
        color: countryColors[countryKey].deaths,
      };
    }

    seriesData[casesKey].data.push(parseInt(item.cases));
    seriesData[deathsKey].data.push(parseInt(item.deaths));
  });

  const series = Object.keys(seriesData).map((key) => ({
    id: key,
    data: seriesData[key].data,
    label: key
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    stack: key.split("-")[0],
    color: seriesData[key].color,
  }));

  return {
    series,
    xAxis: [{ data: months, scaleType: "band", id: "axis1" }],
    height: 400,
    width: 5000,
  };
};

export default function BarClickNoSnap() {
  const [barChartsParams, setBarChartsParams] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "files/monthly_new_covid_stats_by_country.json"
        );
        if (response?.ok) {
          const jsonData = await response.json();
          setBarChartsParams(parseChartData(jsonData));
        } else {
          throw new Error("Data could not be loaded");
        }
      } catch (error) {
        console.error("Error fetching data: ", error?.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 0, md: 4 }}
      sx={{ width: "100%", overflowX: "auto" }}
    >
      <Box sx={{ width: "100%", maxWidth: "100%", overflowX: "scroll" }}>
        {barChartsParams && <BarChart {...barChartsParams} />}
      </Box>
    </Stack>
  );
}
