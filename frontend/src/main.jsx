// src/main.jsx
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
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
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "i am Software Engineer",
        scope: "openid profile email",
      }}
    >
      <RouterProvider router={router} />
    </Auth0Provider>
    {/* </Provider> */}
  </StrictMode>
);
