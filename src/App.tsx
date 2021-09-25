import React from "react";
import logo from "./logo.svg";
import "./App.css";
//NOTE even though we've aliased mapbox to maplibre, we still have to change the name here 😡
import "maplibre-gl/dist/maplibre-gl.css";
import BackdropMap from "./components/BackdropMap/BackdropMap";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <BackdropMap />
    </div>
  );
}

export default App;
