const BASE_URL = "https://disease.sh/v3";
const NEWYORKTIMES_API_KEY = "R8PUtCdm4lum3T2sAcfUM0bbxQdmdFvG";

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

export const getCovid19News = (pageNo) =>
  fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=coronavirus&page=${pageNo}&api-key=${NEWYORKTIMES_API_KEY}`
  ).then((res) => res.json());
