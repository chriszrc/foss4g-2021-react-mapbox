import React, { useState } from "react";
import { InteractiveMap } from "react-map-gl";
import { MapboxProps } from "react-map-gl/src/mapbox/mapbox";
import styles from "./Map.module.css";

const Map: React.FC = () => {
  const [viewport, setViewport] = useState<MapboxProps>({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <div className={styles.Map} data-testid="Map">
      <InteractiveMap
        {...viewport}
        // TODO create a custom Pick<MapboxProps> for better type safety
        onViewportChange={(nextViewport: MapboxProps) =>
          setViewport(nextViewport)
        }
      />
    </div>
  );
};

export default Map;
