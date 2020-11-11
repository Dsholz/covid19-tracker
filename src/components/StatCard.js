import React from "react";
import CountUp from "react-countup";

function StatCard(props) {
  const { name, total, totalToday, borderColor } = props;

  return (
    <div className={`card ${`card--${borderColor}`}`}>
      <span>{name}</span>

      {total && total !== 0 ? (
        <CountUp start={0} end={total} separator="," duration={1} delay={0}>
          {({ countUpRef }) => <span className="card__text" ref={countUpRef} />}
        </CountUp>
      ) : (
        <h1>{total}</h1>
      )}

      <span>
        {name} today :{" "}
        {totalToday && totalToday !== 0 ? (
          <CountUp
            start={0}
            end={totalToday}
            separator=","
            duration={1}
            delay={0}
          >
            {({ countUpRef }) => <span ref={countUpRef} />}
          </CountUp>
        ) : (
          <span>{totalToday}</span>
        )}
      </span>
    </div>
  );
}

export default StatCard;
