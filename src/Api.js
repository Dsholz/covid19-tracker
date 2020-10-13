const BASE_URL = 'https://disease.sh/v3'

export const getCovidData = () => fetch(`${BASE_URL}/covid-19/all`)
  .then(res => res.json())

export const getCovidCountriesData = () => fetch(`${BASE_URL}/covid-19/countries`).then(res => res.json())

export const getCovidHistoricalData = () => fetch(`${BASE_URL}/covid-19/historical/all?lastdays=all`)
  .then(res => res.json())

export const getCovidHistoricalCountryData = (country) => fetch(`${BASE_URL}/covid-19/historical/${country}?lastdays=all`)
  .then(res => res.json())

export const getCovidHistoricalCountriesData = () => fetch(`${BASE_URL}/covid-19/historical?lastdays=all`)
  .then(res => res.json())

