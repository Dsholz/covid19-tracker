import React, { useState } from 'react'
import StatChart from '../components/StatChart'
import StatMap from '../components/StatMap'
import CountryList from '../components/CountryList'
import { getCovidHistoricalCountryData } from '../Api'
import { formatHistorialCountryData } from '../utils'

function DashBoard() {
    const [currentStatData, setCurrentStatData] = useState([])

    const setCountryStatData = (countryData) => {
        const formattedData = formatHistorialCountryData(countryData)

        setCurrentStatData(formattedData)
    }   

    return (
        <div className='dashboard'>
            <div className="dashboard__left">
              <StatChart currentStatData={currentStatData} setCurrentStatData={setCurrentStatData} />
              <StatMap/>
            </div>
            <div className="dashboard__right">
               <CountryList setCountryStatData={setCountryStatData} />
            </div>
        </div>
    )
}

export default DashBoard
