import * as React from "react";
import * as ReactDOM from "react-dom";
import retargetEvents from "react-shadow-dom-retarget-events";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import { LayerDrawer } from "rmg-component-lib";

export default class LayerDrawerWc extends HTMLElement {
  static get observedAttributes() {
    return ["title"];
  }

  mountPoint; //: HTMLSpanElement;
  title; //: string;

  createCollapsed(title, reactRoot) {
    const layerDrawer = React.createElement(
      LayerDrawer,
      {
        layers: [
          {
            id: "Airports",
            getFillColor: [200, 0, 80, 180],
          },
          {
            id: "Arcs",
            getSourceColor: [0, 128, 200],
          },
          {
            id: "H3 Radio Sources",
            getFillColor: (d) => [255, (1 - d.count / 50) * 255, 0],
          },
        ],
        activeLayerIds: ["H3 Radio Sources"],
        onActiveLayerChange: (activeLayerIds) => console.log(activeLayerIds),
      },
      React.createElement("slot")
    );

    // now we use that saved reference to create a JSS configuration
    const jss = create({
      ...jssPreset(),
      insertionPoint: reactRoot,
    });

    const styleProvider = React.createElement(
      StylesProvider,
      { jss },
      layerDrawer
    );
    // return layerDrawer;
    return styleProvider;
  }

  connectedCallback() {
    this.mountPoint = document.createElement("div");
    const reactRoot = this.appendChild(this.mountPoint);

    //TODO how to get the styles injected into the shadowroot?
    // const shadowRoot = this.attachShadow({ mode: "open" });
    // const reactRoot = shadowRoot.appendChild(this.mountPoint);

    const title = this.getAttribute("title");
    ReactDOM.render(this.createCollapsed(title, reactRoot), this.mountPoint);
    retargetEvents(shadowRoot);
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name === "title") {
  //     ReactDOM.render(this.createCollapsed(newValue), this.mountPoint);
  //   }
  // }
}

window.customElements.define("layer-drawer", LayerDrawerWc);

// ReactDOM.render(<layer-drawer></layer-drawer>, document.getElementById("root"));
