import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { ChannelProvider } from "./context";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router-dom";
import router from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ChannelProvider>
        <RouterProvider router={router} />
      </ChannelProvider>
    </ChakraProvider>
  </React.StrictMode>
);

reportWebVitals();
