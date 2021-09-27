import React, { MouseEvent, useCallback } from "react";
import { fitBounds } from "@math.gl/web-mercator";
import { WebMercatorViewport } from "react-map-gl";
import { ViewportProps } from "react-map-gl/src/utils/map-state";
import "./MbxHomeControl.css";

export type Viewport = Omit<ViewportProps, "width" | "height"> &
  Partial<{
    width: number | string;
    height: number | string;
  }>;

export const DefaultMbxHomeControlProps = {
  boundsExtent: [
    [0, 0],
    [0, 0],
  ] as Parameters<typeof fitBounds>[0]["bounds"],
  viewport: {} as Viewport,
  onViewportChange: (viewport: Viewport) => {
    console.log(viewport, "j");
  },
};
export type MbxHomeControlProps = typeof DefaultMbxHomeControlProps;

/**
 *
 * @param props
 * @returns
 */
const MbxHomeControl: React.FC<MbxHomeControlProps> = (props) => {
  const goToHome = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      //NOTE important, don't let button clicks trigger map clicks
      event.stopPropagation();

      //NOTE react-map-gl lacks the traditional fitBounds method, see -
      const viewportFromBbox = new WebMercatorViewport({
        width: parseInt(props.viewport.width + "") || 0,
        height: parseInt(props.viewport.height + "") || 0,
      }).fitBounds(props.boundsExtent, {
        // padding: {
        //   top: padding.top,
        //   right: padding.right,
        //   bottom: padding.bottom,
        //   left: isMobile ? 0 : padding.left,
        // },
        // offset: [0, -10],
      });
      let { latitude, longitude, zoom } = viewportFromBbox;

      props.onViewportChange({ latitude, longitude, zoom });
    },
    [props]
  );

  return (
    <div className="MbxHomeControl" data-testid="MbxHomeControl">
      <div className="mapboxgl-ctrl-group mapboxgl-ctrl">
        <button onClick={goToHome} className="mapboxgl-ctrl-icon" type="button">
          <span className="mapboxgl-ctrl-icon">H</span>
          {/* <ExpandIcon /> */}
        </button>
      </div>
    </div>
  );
};

export default MbxHomeControl;
