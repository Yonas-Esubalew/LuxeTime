// src/routes/index.jsx or similar

import { createBrowserRouter } from "react-router-dom";
import App from "../App"; // ✅ Import App component
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // ✅ This acts as your layout
    children: [
      {
        index: true, // ✅ Better for root child
        element: <Home />,
      },
    ],
  },
]);

export default router;
