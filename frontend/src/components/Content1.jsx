import React from 'react';
import Wacher3 from "../assets/watcher3.jpg";

export const Content4 = () => {
  return (
    <div className="relative rounded-2xl border border-gray-700 flex flex-col-reverse py-16 lg:py-0 lg:flex-row lg:items-center bg-neutral-800">
      {/* Text Content */}
      <div className="w-full max-w-xl px-6 mx-auto lg:px-12 lg:py-20 lg:max-w-screen-xl">
        <div className="mb-0 lg:max-w-lg lg:pr-10 xl:pr-12">
          <h2 className="mb-6 font-sans text-4xl font-extrabold tracking-tight text-white text-center sm:text-5xl sm:leading-tight md:text-left">
            Affordable Luxury, Uncompromised Quality
          </h2>
          <p className="mb-6 text-lg text-gray-300 md:text-xl text-center md:text-left leading-relaxed">
            Experience the perfect blend of sophistication and value with our collection of affordable luxury watches. Designed for those who appreciate premium craftsmanship without the hefty price tag, each timepiece is a testament to elegance, durability, and timeless style.
          </p>
          <div className="flex justify-center md:justify-start">
              <a
                href="/"
                className="inline-flex items-center justify-center px-8 py-3 font-semibold tracking-wide text-white transition duration-300 rounded-lg shadow-md md:w-auto bg-gradient-to-r from-yellow-900 to-yellow-500  hover:from-yellow-500 hover:to-yellow-900 focus:ring-2 focus:ring-white"
              >
                Read More
              </a>
            </div>
        </div>
      </div>

      {/* Image */}
      <div className="w-full max-w-xl px-6 mx-auto mb-6 lg:pl-12 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-1/2 lg:max-w-full lg:absolute lg:right-0 xl:px-0">
        <img
          className="object-cover w-full h-64 rounded-2xl shadow-2xl md:h-96 lg:h-full lg:max-h-[600px]"
          src={Wacher3}
          alt="Affordable Luxury Watches"
        />
      </div>
    </div>
  );
};
