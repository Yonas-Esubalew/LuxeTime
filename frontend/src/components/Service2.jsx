import React from "react";
import { FaShieldAlt, FaTools, FaGem } from "react-icons/fa";

export const Service2 = () => {
  return (
    <section className="bg-neutral-800 py-10 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold text-white capitalize lg:text-3xl">
          Why <span className="text-yellow-600">Choose</span> Us?
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-16 md:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-col items-center p-6 space-y-3 text-center bg-neutral-700 rounded-xl">
            <span className="inline-block p-4 text-yellow-500 bg-neutral-600 rounded-full">
              <FaShieldAlt className="w-10 h-10" />
            </span>
            <h2 className="text-xl font-semibold text-white">Lifetime Warranty</h2>
            <p className="text-gray-300">
              Our watches are built to last, backed by a lifetime warranty for your peace of mind.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 space-y-3 text-center bg-neutral-700 rounded-xl">
            <span className="inline-block p-4 text-yellow-500 bg-neutral-600 rounded-full">
              <FaTools className="w-10 h-10" />
            </span>
            <h2 className="text-xl font-semibold text-white">Expert Craftsmanship</h2>
            <p className="text-gray-300">
              Every timepiece is meticulously designed and handcrafted with precision engineering.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 space-y-3 text-center bg-neutral-700 rounded-xl">
            <span className="inline-block p-4 text-yellow-500 bg-neutral-600 rounded-full">
              <FaGem className="w-10 h-10" />
            </span>
            <h2 className="text-xl font-semibold text-white">Timeless Elegance</h2>
            <p className="text-gray-300">
              Our designs blend classic sophistication with modern aesthetics for any occasion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
