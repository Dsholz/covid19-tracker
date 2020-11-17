import React from "react";

function Header(props) {
  const {
    countriesList,
    getCountryCardData,
    setCountryStatData,
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
    <div className="header">
      <div className="header__logo">
        <span>Covid19Tracker</span>
      </div>

      <div className="header__right">
        <select
          className="header__countries-list"
          onChange={(e) => {
            const assingValues = e.target.value.split(",");
            getCountryCardData(assingValues[0]);
            renderCountryStatData(assingValues[1]);
          }}
        >
          {countriesList.map((country) => (
            <option
              className="countryInfoSelect"
              key={country.name}
              value={`${country.id ? country.id : ""},${country.name}`}
            >
              {country.name}
            </option>
          ))}
        </select>

        <nav className="header__navigation">
          <a href="#Stats">Stats</a>
          <a href="#Chart">Chart</a>
          <a href="#Map">Map</a>
          <a href="#News">News</a>
        </nav>

        <input
          type="checkbox"
          className="header__checkbox"
          name="dropdownChecked"
          id="dropdownChecked"
        />

        <label htmlFor="dropdownChecked" className="header__mobile-navigation">
          <div className="header__mobile-navigation-button"></div>
          <div className="header__mobile-navigation-dropdown">
            <a href="#Stats">Stats</a>
            <a href="#Chart">Chart</a>
            <a href="#Map">Map</a>
            <a href="#News">News</a>
          </div>
        </label>
      </div>
    </div>
  );
}

export default Header;
