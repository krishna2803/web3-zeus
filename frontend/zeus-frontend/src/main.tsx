import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MetaMaskUIProvider
      debug={false}
      sdkOptions={{
        dappMetadata: {
          name: "Zeus",
          url: window.location.host,
        },
      }}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MetaMaskUIProvider>
  </React.StrictMode>
);
