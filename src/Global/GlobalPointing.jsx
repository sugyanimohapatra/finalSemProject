import React, { useState } from "react";
import GlobalPointingMatrix from "../matrix/globalPointingMatrix";

const GlobalPointing = () => {
  const [sequence, setSequence] = useState({ sequence1: "", sequence2: "" });
  const [data, setData] = useState({
    match: 1,
    misMatch: -1,
    gap: -2,
    diagonal: 2,
    vertical: 3,
    horizontal: 1,
  });

  const [isGenerate, setIsGenerate] = useState(false);

  return (
    <div>
      <div className="form_container">
        <div className="form">
          <div className="input_container">
            <label>Enter Sequence 1 : </label>
            <input
              type="text"
              value={sequence.sequence1}
              onChange={(e) => {
                setSequence({ ...sequence, sequence1: e.target.value });
              }}
            />
          </div>
          <div className="input_container">
            <label>Enter Sequence 2 : </label>
            <input
              type="text"
              value={sequence.sequence2}
              onChange={(e) => {
                setSequence({ ...sequence, sequence2: e.target.value });
              }}
            />
          </div>
        </div>
        <div className="value_container">
          <div className="input_container">
            <label>Enter Match Value : </label>
            <input
              type="number"
              value={data.match}
              onChange={(e) => {
                setData({ ...data, match: e.target.value });
              }}
            />
          </div>
          <div className="input_container">
            <label>Enter Mismatch Value : </label>
            <input
              type="number"
              value={data.misMatch}
              onChange={(e) => {
                setData({ ...data, misMatch: e.target.value });
              }}
            />
          </div>
          <div className="input_container">
            <label>Enter Gap Value : </label>
            <input
              type="number"
              value={data.gap}
              onChange={(e) => {
                setData({ ...data, gap: e.target.value });
              }}
            />
          </div>
          <div className="input_container">
            <label>Enter Diagonal Value : </label>
            <input
              type="number"
              value={data.diagonal}
              onChange={(e) => {
                setData({ ...data, diagonal: e.target.value });
              }}
            />
          </div>
          <div className="input_container">
            <label>Enter Vertical Value : </label>
            <input
              type="number"
              value={data.vertical}
              onChange={(e) => {
                setData({ ...data, vertical: e.target.value });
              }}
            />
          </div>
          <div className="input_container">
            <label>Enter Horizontal Value : </label>
            <input
              type="number"
              value={data.horizontal}
              onChange={(e) => {
                setData({ ...data, horizontal: e.target.value });
              }}
            />
          </div>
        </div>
      </div>
      <div style={{padding:"10px"}}>
        <button
            onClick={() => {
              setIsGenerate(true);
            }}
          >
            Generate
          </button>
      </div>
      {
        isGenerate && <GlobalPointingMatrix sequence={sequence} data={data} />
      }
    </div>
  );
};

export default GlobalPointing;
