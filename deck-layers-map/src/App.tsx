import { H3HexagonLayer } from "@deck.gl/geo-layers";
import { ArcLayer, GeoJsonLayer } from "@deck.gl/layers";
//NOTE even though we've aliased mapbox to maplibre, we still have to change the name here 😡
import "maplibre-gl/dist/maplibre-gl.css";
import React, { useState } from "react";
import { LayerDrawer } from "rmg-component-lib";
import "./App.css";
import BackdropMap from "./components/BackdropMap/BackdropMap";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";
const HEX_DATA =
  "https://raw.githubusercontent.com/chriszrc/foss4g-2021-react-mapbox/main/deck-layers-map/public/data/hex_radio_coverage.json";
// "https://raw.githubusercontent.com/visgl/deck.gl-data/45e6a163f8d14e6ff50f4e01b3089643529c136f/website/sf.h3cells.json";

function App() {
  const layers = [
    new GeoJsonLayer({
      id: "Airports",
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getPointRadius: (f: any) => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick: (info: any) =>
        // eslint-disable-next-line
        info.object &&
        alert(
          `${info.object.properties.name} (${info.object.properties.abbrev})`
        ),
    }),
    new ArcLayer<any, {}>({
      id: "Arcs",
      data: AIR_PORTS,
      //NOTE good place to talk about generics in typescript
      dataTransform: (d: any) =>
        d.features.filter((f: any) => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: (f: any) => [-0.4531566, 51.4709959], // London
      getTargetPosition: (f: any) => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1,
      getHeight: 0,
      greatCircle: true,
    }),
    new H3HexagonLayer({
      id: "H3 Radio Sources",
      data: HEX_DATA,
      pickable: true,
      wireframe: false,
      filled: true,
      extruded: true,
      elevationScale: 10000,
      getHexagon: (d: any) => d.hex,
      getFillColor: (d: any) => [255, (1 - d.count / 50) * 255, 0],
      getElevation: (d: any) => d.count,
      opacity: 0.3,
    }),
  ];

  const [activeLayerIds, setActiveLayerIds] = useState<string[]>([
    layers[2].id,
  ]);

  return (
    <div className="App">
      <LayerDrawer
        layers={layers}
        activeLayerIds={activeLayerIds}
        onActiveLayerChange={setActiveLayerIds}
      >
        <BackdropMap
          layers={layers.filter((l) => activeLayerIds.includes(l.id))}
        />
      </LayerDrawer>
    </div>
  );
}

export default App;
