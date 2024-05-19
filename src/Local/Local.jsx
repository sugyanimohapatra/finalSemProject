import React, { useState } from "react";
import LocalPointing from "./LocalPointing";
import LocalScoring from "./LocalScoring";

const Local = () => {
  const [isLocalPointing, setIsLocalPointing] = useState(false);
  const [isLocalScoring, setIsLocalScoring] = useState(false);
  return (
    <div className="global_container">
      <div className="choices_container">
        Print Choices :
        <div className="main_input_container">
          <div className="input_container">
            <input
              type="radio"
              name="LocalChoices"
              onChange={() => {
                setIsLocalPointing(true);
                setIsLocalScoring(false);
              }}
            />
            <label>Pointing Matrix</label>
          </div>
          <div className="input_container">
            <input
              type="radio"
              name="LocalChoices"
              onChange={() => {
                setIsLocalScoring(true);
                setIsLocalPointing(false);
              }}
            />
            <label>Scoring Matrix</label>
          </div>
        </div>
      </div>
      {/* )} */}
      {isLocalPointing && <LocalPointing />}
      {isLocalScoring && <LocalScoring />}
    </div>
  );
};

export default Local;
