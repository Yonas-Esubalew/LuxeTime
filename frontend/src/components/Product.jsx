import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Tim1 from "../assets/tim1.png";
import Tim2 from "../assets/tim2.png";
import Tim3 from "../assets/tim3.png";
import Tim4 from "../assets/tim4.png";
import Tim5 from "../assets/tim5.png";
import Tim6 from "../assets/tim6.png";

const products = [
  {
    image: Tim1,
    name: "Rolex",
    description: "The symbol of prestige and timeless craftsmanship, known for durability and precision.",
    price: "$12,500",
    rating: 5,
  },
  {
    image: Tim2,
    name: "TAG Heuer",
    description: "A fusion of sporty design and precision engineering for high-performance lifestyles.",
    price: "$4,800",
    rating: 4,
  },
  {
    image: Tim3,
    name: "Omega",
    description: "Blending innovation with heritage, Omega is trusted by astronauts and athletes alike.",
    price: "$7,200",
    rating: 5,
  },
  {
    image: Tim4,
    name: "Audemars Piguet",
    description: "Innovative and bold, AP creates unique luxury watches for true connoisseurs.",
    price: "$30,000",
    rating: 5,
  },
  {
    image: Tim5,
    name: "Cartier",
    description: "A perfect mix of jewelry and watchmaking, Cartier defines sophistication and status.",
    price: "$8,600",
    rating: 4,
  },
  {
    image: Tim6,
    name: "Patek Philippe",
    description: "Exquisite Swiss craftsmanship with unmatched elegance and investment value.",
    price: "$50,000",
    rating: 5,
  },
];

const Product2 = () => {
  return (
    <section className="bg-neutral-900 py-16">
      <div className="container px-6 mx-auto text-center">
        <h1 className="text-5xl font-semibold text-white">Best Seller Brands</h1>
        <div className="flex justify-center mt-4">
          <span className="w-40 h-1 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-1 mx-1 bg-yellow-600 rounded-full"></span>
          <span className="w-1 h-1 bg-yellow-700 rounded-full"></span>
        </div>
        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-300">
          Elevate your style with our top-selling luxury watches. Designed for those who appreciate precision, craftsmanship, and prestige.
        </p>
      </div>

      <div className="container px-6 mx-auto mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product, index) => (
          <div 
            key={index} 
            className="group p-6 bg-neutral-800 rounded-xl border border-yellow-600/30 hover:border-yellow-500 transform transition-all duration-300 hover:shadow-xl flex flex-col items-center text-center h-full"
          >
            <div className="relative w-full h-64 overflow-hidden rounded-xl">
              <img 
                className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110" 
                src={product.image} 
                alt={product.name} 
              />
            </div>
            <h1 className="mt-4 text-2xl font-semibold text-white">{product.name}</h1>
            <p className="mt-2 text-gray-400 text-center">{product.description}</p>
            <div className="mt-3 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                i < product.rating ? 
                <FaStar key={i} className="text-yellow-500" /> : 
                <FaRegStar key={i} className="text-gray-500" />
              ))}
            </div>
            <p className="mt-3 text-xl font-bold text-yellow-500">{product.price}</p>
            <div className="mt-4 w-full flex justify-center">
              <a 
                href="/" 
                className="inline-flex items-center justify-center px-6 py-3 font-semibold tracking-wide text-white transition duration-300 rounded-lg bg-gradient-to-r from-yellow-900 to-yellow-500 hover:from-yellow-500 hover:to-yellow-900 focus:ring-2 focus:ring-white w-3/4 text-center"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Product2;