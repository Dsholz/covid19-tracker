import React from 'react'

function Card(props) {
    const {name, total, totalToday, activeCard, getClickedCard} = props
    const isCardClicked = activeCard === name

    return (
        <div 
            className={`card ${isCardClicked ? `card--${name}` : ''}`} 
            onClick={() => {getClickedCard(name)}}
        >
            <span>{name}</span>

            <h1>{total}</h1>

            <span>{name} today : {totalToday}</span>
        </div>
    )
}

export default Card
