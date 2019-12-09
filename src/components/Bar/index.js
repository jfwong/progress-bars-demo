import React from "react";

import "./style.less";

function getBackgroundColor(exceeded) {
  return exceeded ? "#f97c73" : "#86c5f7";
}

const Bar = ({
  index = 0,
  value = 0,
  progressValue = 0,
  limitExceeded = false,
  disabled = false,
  setActive = null
}) => {
  return (
    <>
      <div className={`bar ${disabled && "disabled-bar"}`} onClick={setActive}>
        <div
          className="progress"
          style={{
            width: `${progressValue}%`,
            backgroundColor: getBackgroundColor(limitExceeded)
          }}
        ></div>
        <div className="bar-content">
          <span>{`#Progress ${index + 1}`}</span>
          <span>{value}%</span>
        </div>
      </div>
    </>
  );
};

export default Bar;
