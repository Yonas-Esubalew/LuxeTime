import React from 'react';
import { FaShippingFast, FaUndo, FaHeadset, FaGift, FaUserShield, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';

export const Service3 = () => {
  const services = [
    {
      icon: <FaShippingFast className="text-yellow-500 w-12 h-12" />, 
      title: "Fast & Reliable Delivery",
      description: "Multiple delivery options, including express shipping with real-time tracking.",
    },
    {
      icon: <FaUndo className="text-yellow-500 w-12 h-12" />, 
      title: "Easy Returns & Refunds",
      description: "Hassle-free returns within 30 days for a full refund or exchange.",
    },
    {
      icon: <FaHeadset className="text-yellow-500 w-12 h-12" />, 
      title: "24/7 Live Support",
      description: "Real-time customer support via live chat for product inquiries & assistance.",
    },
    {
      icon: <FaGift className="text-yellow-500 w-12 h-12" />, 
      title: "Personalized Gift Wrapping",
      description: "Elegant gift wrapping services for special occasions.",
    },
    {
      icon: <FaUserShield className="text-yellow-500 w-12 h-12" />, 
      title: "Exclusive Membership Perks",
      description: "Get early access to new collections and VIP discounts.",
    },
    {
      icon: <FaStar className="text-yellow-500 w-12 h-12" />, 
      title: "Premium Quality Assurance",
      description: "Every product is rigorously tested for top-tier quality and craftsmanship.",
    }
  ];

  return (
    <section className="bg-neutral-800 rounded-2xl dark:bg-gray-900 py-12">
      <div className="container px-6 py-10 mx-auto text-center">
        <h1 className="text-5xl font-semibold text-white capitalize lg:text-3xl dark:text-white">
          Our Brand <span className="text-yellow-600">Services</span>
        </h1>
        <p className="mt-4 text-gray-300 xl:mt-6 dark:text-gray-300">
          Explore our curated collection of luxury, sport, and smartwatches. Find the perfect timepiece that matches your style and budget.
        </p>

        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="p-8 bg-neutral-700 space-y-3 border border-yellow-600 rounded-xl text-center shadow-lg hover:scale-105 transition-transform"
              whileHover={{ scale: 1.05 }}
            >
              <span className="flex items-center justify-center">
                {service.icon}
              </span>
              <h1 className="text-xl font-semibold text-white capitalize">{service.title}</h1>
              <p className="text-gray-300">{service.description}</p>
              <a href="#" className="inline-flex items-center justify-center px-8 py-3 font-semibold tracking-wide text-white transition duration-300 rounded-lg shadow-md bg-gradient-to-r from-yellow-900 to-yellow-500 hover:from-yellow-500 hover:to-yellow-900 focus:ring-2 focus:ring-white">
                Read More
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
