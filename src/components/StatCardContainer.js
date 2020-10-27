import React from "react";
import { useState, useEffect } from "react";
import { getCovidData } from "../Api";
import StatCard from "./StatCard";

function StatCardContainer(props) {
  const [currentData, setCurrentData] = useState({});
  const { countryCardData } = props;

  useEffect(() => {
    setCurrentData(countryCardData);
  }, [countryCardData]);

  //console.log(currentData);

  useEffect(() => {
    getCovidData().then((data) => {
      setCurrentData({
        cases: data.cases,
        casesToday: data.todayCases,
        recovered: data.recovered,
        recoveredToday: data.todayRecovered,
        deaths: data.deaths,
        deathsToday: data.todayDeaths,
      });
    });
  }, []);

  return (
    <div id="Stats" className="card-container">
      <StatCard
        name="cases"
        total={currentData.cases}
        totalToday={currentData.casesToday}
        borderColor={"yellow"}
      />

      <StatCard
        name="recovered"
        total={currentData.recovered}
        totalToday={currentData.recoveredToday}
        borderColor={"green"}
      />

      <StatCard
        name="deaths"
        total={currentData.deaths}
        totalToday={currentData.deathsToday}
        borderColor={"red"}
      />
    </div>
  );
}

export default StatCardContainer;
