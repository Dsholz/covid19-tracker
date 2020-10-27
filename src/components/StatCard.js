import React from "react";
import CountUp from "react-countup";

function StatCard(props) {
  const { name, total, totalToday, borderColor } = props;

  return (
    <div className={`card ${`card--${borderColor}`}`}>
      <span>{name}</span>

      {total && total !== 0 ? (
        <CountUp start={0} end={total} separator="," duration={2} delay={0}>
          {({ countUpRef }) => <h1 ref={countUpRef}></h1>}
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
            duration={2}
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