import React, { useState } from "react";
import "./sass/app.scss";
import DashBoard from "./pages/DashBoard";
import { useEffect } from "react";
import { getCovidCountriesData } from "./Api";

function App() {
  const [appDataReady, setAppDataReady] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [countriesPresentData, setCountriesPresentData] = useState([]);

  useEffect(() => {
    getCovidCountriesData().then((data) => {
      const sortedData = data.sort((a, b) => b.cases - a.cases);
      const countriesName = data
        .map((country) => ({
          id: country.countryInfo.iso2,
          name: country.country,
        }))
        .sort((countryA, countryB) => {
          const countryNameA = countryA.name.toLowerCase();
          const countryNameB = countryB.name.toLowerCase();

          if (countryNameA < countryNameB) {
            return -1;
          } else if (countryNameA > countryNameB) {
            return 1;
          } else {
            return 0;
          }
        });

      setCountriesList(countriesName);
      setCountriesPresentData(sortedData);
      setAppDataReady(true);
    });
  }, []);

  return (
    <div className="App">
      {appDataReady ? (
        <DashBoard
          appDataReady={appDataReady}
          countriesPresentData={countriesPresentData}
          countriesList={countriesList}
        />
      ) : (
        <img
          className="loading-screen"
          src="https://media.giphy.com/media/idShevOa24HzYTgz06/giphy-downsized.gif"
          alt="Keep Clean Gif"
        />
      )}
    </div>
  );
}

export default App;
