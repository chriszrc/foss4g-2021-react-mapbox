import React, { useState } from "react";
import DeckGL, { ArcLayer, GeoJsonLayer, H3HexagonLayer } from "deck.gl";
import {
  InteractiveMap,
  LayerProps,
  NavigationControl,
  StaticMap,
} from "react-map-gl";
// import { MapboxProps } from "react-map-gl/src/mapbox/mapbox";
import styles from "./BackdropMap.module.css";
import { ViewportProps } from "react-map-gl/src/utils/map-state";
import MbxHomeControl from "../MbxHomeControl/MbxHomeControl";

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";
const HEX_DATA =
  "https://raw.githubusercontent.com/chriszrc/foss4g-2021-react-mapbox/main/public/data/hex_radio_coverage.json";
// "https://raw.githubusercontent.com/visgl/deck.gl-data/45e6a163f8d14e6ff50f4e01b3089643529c136f/website/sf.h3cells.json";

export type Viewport = Omit<ViewportProps, "width" | "height"> &
  Partial<{
    width: number | string;
    height: number | string;
  }>;

/**
 *
 * @returns
 */
const BackdropMap = () => {
  const [viewport, setViewport] = useState<Viewport>({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    pitch: 0,
    bearing: 0,
  });

  const layers = [
    // new GeoJsonLayer({
    //   id: "airports",
    //   data: AIR_PORTS,
    //   // Styles
    //   filled: true,
    //   pointRadiusMinPixels: 2,
    //   pointRadiusScale: 2000,
    //   getPointRadius: (f: any) => 11 - f.properties.scalerank,
    //   getFillColor: [200, 0, 80, 180],
    //   // Interactive props
    //   pickable: true,
    //   autoHighlight: true,
    //   onClick: (info: any) =>
    //     // eslint-disable-next-line
    //     info.object &&
    //     alert(
    //       `${info.object.properties.name} (${info.object.properties.abbrev})`
    //     ),
    // }),
    // new ArcLayer<any, {}>({
    //   id: "arcs",
    //   data: AIR_PORTS,
    //   //NOTE good place to talk about generics in typescript
    //   dataTransform: (d: any) =>
    //     d.features.filter((f: any) => f.properties.scalerank < 4),
    //   // Styles
    //   getSourcePosition: (f: any) => [-0.4531566, 51.4709959], // London
    //   getTargetPosition: (f: any) => f.geometry.coordinates,
    //   getSourceColor: [0, 128, 200],
    //   getTargetColor: [200, 0, 80],
    //   getWidth: 1,
    //   getHeight: 0,
    //   greatCircle: true,
    // }),
    new H3HexagonLayer({
      id: "h3-hexagon-layer",
      data: HEX_DATA,
      pickable: true,
      wireframe: false,
      filled: true,
      extruded: true,
      elevationScale: 10000,
      getHexagon: (d: any) => d.hex,
      getFillColor: (d: any) => [255, (1 - d.count / 50) * 255, 0],
      getElevation: (d: any) => d.count,
      opacity: 0.2,
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
        onViewportChange={(nextViewport: Viewport) => {
          console.log(nextViewport);
          setViewport(nextViewport);
        }}
      >
        <DeckGL initialViewState={viewport} layers={layers}></DeckGL>
        <NavigationControl
          className="navigation-control"
          // style={mapboxService.navStyle}
        />
        <MbxHomeControl
          //World bounds
          boundsExtent={[
            [-180, -40],
            [180, 70],
          ]}
          viewport={viewport}
          onViewportChange={(nextViewport: Viewport) => {
            console.log(nextViewport);
            setViewport({ ...viewport, ...nextViewport });
          }}
          // padding={{ top: 0, right: 0, bottom: 0, left: 270 }}
        />
      </InteractiveMap>
    </div>
  );
};

export default BackdropMap;
