import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <div className="app">
        <div className="blur-box">
          <App />
        </div>
      </div>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
