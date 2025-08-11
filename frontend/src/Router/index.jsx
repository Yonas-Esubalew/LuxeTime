// src/routes/index.jsx or similar

import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // ✅ Import App component
import Home from "../pages/Home";
import Overview from "../pages/Overview";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // ✅ This acts as your layout
    children: [
      {
        index: true, // ✅ Better for root child
        element: <Home />,
      },
      {
        path: "/overview",
        element: <Overview />,
      },
    ],
  },
]);

export default router;
