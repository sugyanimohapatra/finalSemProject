import React, { useState } from "react";
import GlobalPointing from "./GlobalPointing";
import GlobalScoring from "./GlobalScoring";

const Global = () => {
  const [isGlobalPointing, setIsGlobalPointing] = useState(false);
  const [isGlobalScoring, setIsGlobalScoring] = useState(false);
  return (
    <div className="global_container">
      <div className="choices_container">
        Print Choices :
        <div className="main_input_container">
          <div className="input_container">
            <input
              type="radio"
              name="globalChoices"
              onChange={() => {
                setIsGlobalPointing(true);
                setIsGlobalScoring(false);
              }}
            />
            <label>Pointing Matrix</label>
          </div>
          <div className="input_container">
            <input
              type="radio"
              name="globalChoices"
              onChange={() => {
                setIsGlobalScoring(true);
                setIsGlobalPointing(false);
              }}
            />
            <label>Scoring Matrix</label>
            <br />
          </div>
        </div>
      </div>
      {/* )} */}
      {isGlobalPointing && <GlobalPointing />}
      {isGlobalScoring && <GlobalScoring />}
    </div>
  );
};

export default Global;
