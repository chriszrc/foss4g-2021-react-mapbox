/* eslint-disable */
import MbxHomeControl, { DefaultMbxHomeControlProps } from "./MbxHomeControl";
import "maplibre-gl/dist/maplibre-gl.css";

export default {
  title: "MbxHomeControl",
};

export const Default = () => <MbxHomeControl {...DefaultMbxHomeControlProps} />;

Default.story = {
  name: "default",
};
