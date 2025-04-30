// src/main.jsx
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { RouterProvider } from "react-router-dom";
import router from "./Router/index";
// import { Provider } from "react-redux";
// import  store  from "./store/Store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <Provider store={store}> */}
      <Auth0Provider
        domain="dev-obzcyutqfowddcve.us.auth0.com"
        clientId="gvuGG6ITC9rA9RzUfWFzDfa2uEKRcgfo"
        authorizationParams={{
          redirectUri: window.location.origin,
          audience: "i am Software Engineer",
          scope: "openid profile email",
        }}
      >
        <RouterProvider router={router} />
        {/* <App /> */}
      </Auth0Provider>
    {/* </Provider> */}
  </StrictMode>
);
