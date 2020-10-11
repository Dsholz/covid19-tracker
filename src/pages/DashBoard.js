import React from 'react'
import StatChart from '../components/StatChart'
import StatMap from '../components/StatMap'
import CountryList from '../components/CountryList'

function DashBoard() {
    return (
        <div className='dashboard'>
            <div className="dashboard__left">
              <StatChart/>
              <StatMap/>
            </div>
            <div className="dashboard__right">
               <CountryList />
            </div>
        </div>
    )
}

export default DashBoard
