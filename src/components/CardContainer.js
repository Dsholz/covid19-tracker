import React from 'react'
import { useState, useEffect } from 'react'
import { getCovidData } from '../Api'
import Card from './Card'

function CardContainer() {
    const [currentData, setCurrentData] = useState({})
    const [activeCard, setActiveCard] = useState('cases')

    const getClickedCard = (cardName) => {
        setActiveCard(cardName)
    }

    useEffect(() => {
        getCovidData()
        .then(data => {
            console.log(data)

            setCurrentData({
                cases: data.cases,
                casesToday: data.todayCases,
                recovered: data.recovered,
                recoveredToday: data.todayRecovered,
                deaths: data.deaths,
                deathsToday: data.todayDeaths
            })
        })
    }, [])

    return (
        <div className='card-container'>
            <Card
                name='cases'
                total={currentData.cases}
                activeCard={activeCard}
                getClickedCard={getClickedCard}
                totalToday={currentData.casesToday}
            />

            <Card
                name='recovered'
                total={currentData.recovered}
                activeCard={activeCard}
                getClickedCard={getClickedCard}
                totalToday={currentData.recoveredToday}
            />

            <Card
                name='deaths'
                total={currentData.deaths}
                activeCard={activeCard}
                getClickedCard={getClickedCard}
                totalToday={currentData.deathsToday}
            />
        </div>
    )
}

export default CardContainer
