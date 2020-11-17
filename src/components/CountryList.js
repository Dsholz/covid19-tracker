import React from "react";

function CountryList(props) {
  const {
    getCountryCardData,
    setCountryStatData,
    countriesPresentData,
    countriesHistoricalData,
  } = props;

  const renderCountryStatData = (country) => {
    const countryData = countriesHistoricalData.find(
      (countryData) => countryData.country === country
    );

    if (countryData) {
      setCountryStatData(countryData);
    }
  };

  return (
    <table className="country-list">
      <thead>
        <tr>
          <th>Country</th>
          <th>Cases</th>
          <th>Recovered</th>
          <th>Deaths</th>
        </tr>
      </thead>
      <tbody>
        {countriesPresentData?.map((country) => (
          <tr
            className="countryInfo"
            key={country.country}
            onClick={() => {
              getCountryCardData(country.country);
              renderCountryStatData(country.country);
            }}
          >
            <td>{country.country}</td>
            <td>{country.cases}</td>
            <td>{country.recovered}</td>
            <td>{country.deaths}</td>
            <td style={{ display: "none" }}>{country.countryInfo.iso2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CountryList;
