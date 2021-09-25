import React, { useState } from "react";
import DeckGL, { ArcLayer, GeoJsonLayer } from "deck.gl";
import {
  InteractiveMap,
  LayerProps,
  NavigationControl,
  StaticMap,
} from "react-map-gl";
import { MapboxProps } from "react-map-gl/src/mapbox/mapbox";
import styles from "./BackdropMap.module.css";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";

const BackdropMap = () => {
  const [viewport, setViewport] = useState<MapboxProps>({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    pitch: 0,
    bearing: 0,
  });

  const layers = [
    new GeoJsonLayer({
      id: "airports",
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
      id: "arcs",
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
  ];

  return (
    <div className={styles.BackdropMap} data-testid="Map">
      {/* <DeckGL initialViewState={viewport} controller={true} layers={layers}>
        <StaticMap
          mapStyle={
            "https://api.maptiler.com/maps/darkmatter/style.json?key=KPAes9JewZwTvw7aTuuq"
          }
        >
          <NavigationControl
            className="navigation-control"
            // showCompass={false}
            // style={mapboxService.navStyle}
          />
        </StaticMap>
      </DeckGL> */}
      <InteractiveMap
        mapStyle={
          "https://api.maptiler.com/maps/darkmatter/style.json?key=KPAes9JewZwTvw7aTuuq"
        }
        {...viewport}
        // TODO create a custom Pick<MapboxProps> for better type safety
        onViewportChange={(nextViewport: MapboxProps) =>
          setViewport(nextViewport)
        }
      >
        <DeckGL initialViewState={viewport} layers={layers}></DeckGL>
        <NavigationControl
          className="navigation-control"
          // showCompass={false}
          // style={mapboxService.navStyle}
        />
      </InteractiveMap>
    </div>
  );
};

export default BackdropMap;
