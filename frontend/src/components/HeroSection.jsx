import React, { useState } from "react";
import { motion } from "framer-motion";
import EAR from "../assets/watches1.png";
import TimeWatch from "../assets/time_Watch.png";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common/SummaryApi";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";

const HeroSection1 = () => {
  const [data, setData] = useState({
    email: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const validValue = Object.values(data).every((el) => el);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...SummaryApi.email_submit,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          email: "",
        });
        navigate("/product");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <div className="text-white w-full relative z-20 flex items-center overflow-hidden bg-neutral-700 h-full container bg-gradient-to-r rounded-b-lg from-neutral-800 via-neutral-900 to-neutral-900 top-10">
      <div className="container relative flex flex-col-reverse md:flex-row px-6 py-16 items-center justify-between">
        {/* Text Section */}
        <div className="relative z-20 flex flex-col sm:w-2/3 md:w-1/2 lg:w-2/5 text-center md:text-left">
          <span className="w-20 h-1 mb-6 bg-yellow-500 self-center md:self-start"></span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            <span className="bg-clip-text bg-gradient-to-r text-yellow-500 font-serif text-4xl md:text-5xl font-semibold tracking-wide">
              LuxeTime
            </span>
            <br />
            Redefining Luxury, One Second at a Time
          </h1>
          <p className="text-lg md:text-xl text-neutral-300 mt-4">
            Own the moment with our premium watches. Crafted for perfection,
            worn for prestige. Elevate your style and embrace the art of
            timekeeping.
          </p>
          {/* Email Subscription Form */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
           
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 text-black w-80 border border-yellow-500 rounded-lg bg-blue-50 text-lg focus:ring-2 focus:ring-yellow-500"
              value={data.email}
              onChange={handleChange}
            />
            <button onClick={handleSubmit}
              disabled={!validValue}
              type="submit"
              className="px-6 py-3 text-white uppercase font-bold border-1 border-yellow-500 rounded-lg text-md bg-gradient-to-r from-yellow-900 to-yellow-500  hover:from-yellow-500 hover:to-yellow-900 focus:ring-2 focus:ring-white hover:text-black transition duration-300"
            >
              Get Started
            </button>
          </div>
          {/* Business & Marketing Features */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-3xl">📦</span>
              <p className="text-neutral-300 text-md">
                Free worldwide shipping on all orders
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-3xl">⭐</span>
              <p className="text-neutral-300 text-md">
                Exclusive limited-edition collections
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-3xl">🛍</span>
              <p className="text-neutral-300 text-md">
                Luxury packaging with every purchase
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-yellow-500 text-3xl">💎</span>
              <p className="text-neutral-300 text-md">
                Guaranteed authenticity & craftsmanship
              </p>
            </div>
          </div>
        </div>
        {/* Image Section with Background Shape */}
        <div className="relative flex justify-center sm:w-2/3 md:w-1/2 lg:w-3/5">
          <div className="absolute inset-0 bg-yellow-700 lg:ml-30 opacity-50 rounded-full w-[450px] h-[450px] md:w-[550px] md:h-[550px] lg:w-[650px] lg:h-[650px] blur-2xl "></div>
          <motion.img
            src={TimeWatch}
            alt="heroImage"
            className="relative w-full max-w-[400px] sm:max-w-[500px] md:max-w-[550px] lg:max-w-[600px] object-contain"
            initial={{ y: 10 }}
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection1;
