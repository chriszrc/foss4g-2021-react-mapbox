import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MbxHomeControl, { DefaultMbxHomeControlProps } from "./MbxHomeControl";

describe("<MbxHomeControl />", () => {
  test("it should mount", () => {
    render(<MbxHomeControl {...DefaultMbxHomeControlProps} />);

    const mbxHomeControl = screen.getByTestId("MbxHomeControl");

    expect(mbxHomeControl).toBeInTheDocument();
  });
});
