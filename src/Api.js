const BASE_URL = "https://disease.sh/v3";
const NEWSAPI_API_KEY = "721b4c8c68fc44758b23f1ce147ca69b";

// Disease.sh Covid Data

export const getCovidData = () =>
  fetch(`${BASE_URL}/covid-19/all`).then((res) => res.json());

export const getCovidCountriesData = () =>
  fetch(`${BASE_URL}/covid-19/countries`).then((res) => res.json());

export const getCovidCountryData = (country) =>
  fetch(`${BASE_URL}/covid-19/countries/${country}`).then((res) => res.json());

export const getCovidHistoricalData = () =>
  fetch(`${BASE_URL}/covid-19/historical/all?lastdays=all`).then((res) =>
    res.json()
  );

export const getCovidHistoricalCountryData = (country) =>
  fetch(`${BASE_URL}/covid-19/historical/${country}?lastdays=all`).then((res) =>
    res.json()
  );

export const getCovidHistoricalCountriesData = () =>
  fetch(`${BASE_URL}/covid-19/historical?lastdays=all`).then((res) =>
    res.json()
  );

// NewsAPI Coid News

export const getCovid19News = () =>
  fetch(
    `https://newsapi.org/v2/everything?qInTitle=covid&pageSize=50&sortBy=popularity&language=en&apiKey=${NEWSAPI_API_KEY}`
  ).then((res) => res.json());
