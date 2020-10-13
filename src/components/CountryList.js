import React, { useEffect, useState } from 'react'
import { getCovidCountriesData, getCovidHistoricalCountriesData } from '../Api'

function CountryList(props) {
    const [countriesPresentData, setCountriesPresentData] = useState([])
    const [countriesHistoricalData, setCountriesHistoricalData] = useState([])
    const {setCountryStatData} = props

    useEffect(() => {
        getCovidCountriesData()
        .then(data => {
            const sortedData = data.sort((a,b) => b.cases - a.cases)

            setCountriesPresentData(sortedData)
        })

        getCovidHistoricalCountriesData()
        .then(data => {
            setCountriesHistoricalData(data)
        })
    }, [])

    const renderCountryStatData = (country) => {
        const countryData = countriesHistoricalData.find(countryData => countryData.country === country)

        if (countryData) {
            setCountryStatData(countryData)   
        }
    }

    return (
        <div className='country-list'>
            <table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Cases</th>
                        <th>Recovered</th>
                        <th>Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    {countriesPresentData?.map(country => (
                        <tr key={country.country} onClick={() => renderCountryStatData(country.country)}>
                            <td>{country.country}</td>
                            <td>{country.cases}</td>
                            <td>{country.recovered}</td>
                            <td>{country.deaths}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CountryList
