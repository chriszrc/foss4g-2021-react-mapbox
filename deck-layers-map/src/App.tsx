import React from "react";
import logo from "./logo.svg";
import "./App.css";
//NOTE even though we've aliased mapbox to maplibre, we still have to change the name here 😡
import "maplibre-gl/dist/maplibre-gl.css";
import BackdropMap from "./components/BackdropMap/BackdropMap";

function App() {
  return (
    <div className="App">
      <BackdropMap />
    </div>
  );
}

export default App;
