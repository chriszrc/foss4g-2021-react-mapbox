import React from "react";

export const SayHello = ({ name }: { name: string }): JSX.Element => (
  <div>Hey {name}, say hello to TypeScript.</div>
);

//barrel file of exports
export { default as MbxHomeControl } from "./components/MbxHomeControl/MbxHomeControl";
