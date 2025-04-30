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



      <section className="bg-neutral-900">
      <div className="container mx-auto border  w-full bg-neutral-900 relative">
        <div className="w-full h-full">
          <Nav23 />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <HeroSection1 />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <Product2 />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <Service3 />
        </div>
        <div>
          <Carousel />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <Content4 />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          {/* Store Photos */}
          <Content />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <Content2 />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <TrustedNumber />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <Service2 />
        </div>

        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <Last />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <Trusted />
        </div>
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <Footer />
        </div>
      </div>
    </section>
    ],
  },
]);

export default router;
