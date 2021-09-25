import React, { useState } from "react";
import styles from "./BackdropMap.module.css";
import { InteractiveMap, NavigationControl } from "react-map-gl";
import { MapboxProps } from "react-map-gl/src/mapbox/mapbox";

const BackdropMap = () => {
  const [viewport, setViewport] = useState<MapboxProps>({
    width: "100vw",
    height: "100vh",
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <div className={styles.Map} data-testid="Map">
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
