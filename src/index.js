import React from "react";
import ReactDOM from "react-dom";
import {
  applyPolyfills,
  defineCustomElements,
} from "@garpix/garpix-web-components/loader";
import "@garpix/garpix-web-components/dist/garpix-web-components/garpix-web-components.css";
import reportWebVitals from "./reportWebVitals";
import { StoreContext } from "storeon/react";
import { store } from "./store";
import "./styles/index.scss";
import { MainPage } from "@pages";

ReactDOM.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <MainPage />
    </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

applyPolyfills().then(() => {
  defineCustomElements();
});
