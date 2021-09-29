import React from "react";
import ReactDOM from "react-dom";
import retargetEvents from "react-shadow-dom-retarget-events";
import { StylesProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
import { LayerDrawer } from "rmg-component-lib";

export default class LayerDrawerWc extends HTMLElement {
  mountPoint; //: HTMLSpanElement;
  reactRoot;
  // title; //: string;

  constructor() {
    super();
    this.mountPoint = document.createElement("div");
    this.reactRoot = this.appendChild(this.mountPoint);

    // const shadowRoot = this.attachShadow({ mode: "open" });
    // this.mountPoint = document.createElement("span");
    // this.reactRoot = shadowRoot.appendChild(this.mountPoint);
  }

  createCollapsed(props, reactRoot) {
    const layerDrawer = React.createElement(
      LayerDrawer,
      {
        // layers: [
        //   {
        //     id: "Airports",
        //     getFillColor: [200, 0, 80, 180],
        //   },
        //   {
        //     id: "Arcs",
        //     getSourceColor: [0, 128, 200],
        //   },
        //   {
        //     id: "H3 Radio Sources",
        //     getFillColor: (d) => [255, (1 - d.count / 50) * 255, 0],
        //   },
        // ],
        // activeLayerIds: ["H3 Radio Sources"],
        layers: props.layers,
        activeLayerIds: props["active-layer-ids"],
        onActiveLayerChange: (activeLayerIds) => console.log(activeLayerIds),
      },
      React.createElement("slot")
    );

    // now we use that saved reference to create a JSS configuration
    const jss = create({
      ...jssPreset(),
      insertionPoint: reactRoot,
    });

    //TODO but now how to we pass children elements to the react slot of layer drawer?
    const styleProvider = React.createElement(
      StylesProvider,
      { jss },
      layerDrawer
    );
    // return layerDrawer;
    return styleProvider;
  }

  getJsonAttributes(observedAttributes) {
    return observedAttributes.reduce((acc, cur) => {
      acc[cur] = JSON.parse(this.getAttribute(cur));
      return acc;
    }, {});
  }

  connectedCallback() {
    //TODO how to get the styles injected into the shadowroot?
    // const shadowRoot = this.attachShadow({ mode: "open" });
    // const reactRoot = shadowRoot.appendChild(this.mountPoint);

    const props = this.getJsonAttributes(LayerDrawerWc.observedAttributes);

    ReactDOM.render(
      this.createCollapsed(props, this.reactRoot),
      this.mountPoint
    );
    // retargetEvents(shadowRoot);
  }

  /**
   * NOTE only called for attributes listed in the #observedAttributes
   * @param {*} name
   * @param {*} oldValue
   * @param {*} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (LayerDrawerWc.observedAttributes.includes(name)) {
      const props = this.getJsonAttributes(LayerDrawerWc.observedAttributes);
      ReactDOM.render(
        this.createCollapsed(props, this.reactRoot),
        this.mountPoint
      );
    }
  }

  /**
   * List the attributes here for which we want to listen for changes
   */
  static get observedAttributes() {
    return ["active-layer-ids", "layers"];
  }
}

window.customElements.define("layer-drawer", LayerDrawerWc);

// ReactDOM.render(<layer-drawer></layer-drawer>, document.getElementById("root"));
