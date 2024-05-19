import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import Global from "./Global/Global";
import Local from "./Local/Local";

function App() {
  const [isGlobal, setIsGlobal] = useState(false);
  const [isLocal, setIsLocal] = useState(false);
  return (
    <div className="App">
      <div className="app_container">
        <div className="header_container">
          <h1> DNA Sequence Alignment </h1> 
        </div>
        {/* {!isGlobal && !isLocal && ( */}
        <div className="choices_container">
          Choices :
          <div className="main_input_container">
            <div className="input_container">
              <input
                type="radio"
                name="choices"
                onChange={() => {
                  setIsGlobal(true);
                  setIsLocal(false);
                }}
              />
              <label>Global Alignment</label>
            </div>
            <div className="input_container">
              <input
                type="radio"
                name="choices"
                onChange={() => {
                  setIsLocal(true);
                  setIsGlobal(false);
                }}
              />
              <label>Local Alignment</label>
            </div>
          </div>
        </div>
        {/* )} */}
        {isGlobal && <Global />}
        {isLocal && <Local />}
      </div>
    </div>
  );
}

export default App;
