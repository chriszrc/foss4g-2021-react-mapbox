/* eslint-disable */
import MbxHomeControl, { DefaultMbxHomeControlProps } from "./MbxHomeControl";
import "maplibre-gl/dist/maplibre-gl.css";

export default {
  title: "MbxHomeControl",
  component: MbxHomeControl,
  argTypes: { onViewportChange: { action: "clicked" } },
  // parameters: { actions: { argTypesRegex: "^on.*" } },
};

export const Default = () => <MbxHomeControl {...DefaultMbxHomeControlProps} />;

Default.story = {
  name: "default",
};
