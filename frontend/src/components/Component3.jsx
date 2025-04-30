import React from 'react';
import Wacher2 from "../assets/bes.png";
import { motion } from "framer-motion";

export const Last = () => {
  return (
    <div className="relative flex flex-col lg:flex-row items-center bg-neutral-800 rounded-2xl border border-gray-700 overflow-hidden py-12 px-6 lg:py-16 lg:px-12">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 text-center lg:text-left max-w-2xl">
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Affordable Luxury, <br /> Uncompromised Quality
        </motion.h2>
        <p className="mt-6 text-gray-300 text-lg md:text-xl">
          Experience the perfect blend of sophistication and value with our collection of affordable luxury watches. Designed for those who appreciate premium craftsmanship without the hefty price tag.
        </p>
        <motion.a
          href="/"
          className="mt-8 inline-block px-8 py-3 font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-yellow-900 to-yellow-500 hover:from-yellow-500 hover:to-yellow-900 transition duration-300"
          whileHover={{ scale: 1.05 }}
        >
          Read More
        </motion.a>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
        <motion.img
          src={Wacher2}
          alt="Luxury Watch"
          className="w-full max-w-sm sm:max-w-md lg:max-w-full rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  );
};