import React, { useState } from 'react'
import StatChart from '../components/StatChart'
import StatMap from '../components/StatMap'
import CountryList from '../components/CountryList'
import { formatHistorialCountryData } from '../utils'
import CardContainer from '../components/CardContainer'

function DashBoard() {
    const [currentStatData, setCurrentStatData] = useState([])
    const [dataReady, setDataReady] = useState(false)

    const setCountryStatData = (countryData) => {
        const formattedData = formatHistorialCountryData(countryData)

        setCurrentStatData(formattedData)
    }   

    return (
        <div className='dashboard'>
            <div className="dashboard__left">
              <CardContainer/> 
              <StatChart currentStatData={currentStatData} setCurrentStatData={setCurrentStatData} />
              <StatMap dataReady={dataReady} />
            </div>
            <div className="dashboard__right">
               <CountryList setDataReady={setDataReady} setCountryStatData={setCountryStatData} />
            </div>
        </div>
    )
}

export default DashBoard
