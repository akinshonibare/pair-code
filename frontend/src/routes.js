// imports
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { isMobile } from "react-device-detect";
import { Tag } from "antd";
import App from "./components/App";

const routes = (
  <CookiesProvider>
    <Router>
      {isMobile ? (
        <div
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Tag color="red">
            code pair unavailable on mobile, open on laptop/desktop
          </Tag>
        </div>
      ) : (
        <App />
      )}
    </Router>
  </CookiesProvider>
);

// exports
export default routes;
