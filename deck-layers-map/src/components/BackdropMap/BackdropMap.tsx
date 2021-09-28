import React, { useState } from "react";
import DeckGL from "deck.gl";
import {
  InteractiveMap,
  LayerProps,
  NavigationControl,
  StaticMap,
} from "react-map-gl";
// import { MapboxProps } from "react-map-gl/src/mapbox/mapbox";
import styles from "./BackdropMap.module.css";
import { ViewportProps } from "react-map-gl/src/utils/map-state";
import { MbxHomeControl } from "rmg-component-lib";
import { Layer } from "@deck.gl/core";
// import MbxHomeControl from "../MbxHomeControl/MbxHomeControl";

export type Viewport = Omit<ViewportProps, "width" | "height"> &
  Partial<{
    width: number | string;
    height: number | string;
  }>;

export type BackdropMapProps = {
  layers: Layer<any>[];
};

/**
 *
 * @returns
 */
const BackdropMap: React.FC<BackdropMapProps> = (props) => {
  const [viewport, setViewport] = useState<Viewport>({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -100.4376,
    zoom: 3,
    pitch: 0,
    bearing: 0,
  });

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
          // console.log(nextViewport);
          setViewport(nextViewport);
        }}
      >
        <DeckGL initialViewState={viewport} layers={props.layers}></DeckGL>
        <div className={styles.navContainer}>
          <NavigationControl
            className="navigation-control"
            // style="navStyle"
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
        </div>
      </InteractiveMap>
    </div>
  );
};

export default BackdropMap;
