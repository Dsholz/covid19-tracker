import React, { Fragment, useState } from "react";
import StatChart from "../components/StatChart";
import StatMap from "../components/StatMap";
import CountryList from "../components/CountryList";
import { formatHistorialCountryData } from "../utils";
import StatCardContainer from "../components/StatCardContainer";
import Header from "../components/Header";
import NewsCardContainer from "../components/NewsCardContainer";

function DashBoard(props) {
  const [currentStatData, setCurrentStatData] = useState([]);
  const [countryCardData, setCountryCardData] = useState({});
  const { appDataReady, countriesList, countriesPresentData } = props;

  const setCountryStatData = (countryData) => {
    const formattedData = formatHistorialCountryData(countryData);

    setCurrentStatData(formattedData);
  };

  const getCountryCardData = (countryName) => {
    const data = countriesPresentData.find(
      (country) =>
        country.country === countryName ||
        country.countryInfo.iso2 === countryName
    );
    const formattedCountryCardData = {
      cases: data.cases,
      casesToday: data.todayCases,
      recovered: data.recovered,
      recoveredToday: data.todayRecovered,
      deaths: data.deaths,
      deathsToday: data.todayDeaths,
    };

    setCountryCardData(formattedCountryCardData);
  };

  return (
    <Fragment>
      <Header
        getCountryCardData={getCountryCardData}
        countriesList={countriesList}
      />
      <div className="dashboard">
        <div className="dashboard__left">
          <StatCardContainer countryCardData={countryCardData} />
          <StatChart
            currentStatData={currentStatData}
            setCurrentStatData={setCurrentStatData}
          />
          <StatMap dataReady={appDataReady} />
          <NewsCardContainer />
        </div>
        <div className="dashboard__right">
          <CountryList
            countriesPresentData={countriesPresentData}
            getCountryCardData={getCountryCardData}
            setCountryStatData={setCountryStatData}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default DashBoard;
