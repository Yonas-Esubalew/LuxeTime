import React from "react";
import T1 from "../assets/T1.jpg";
import T2 from "../assets/T2.jpg";
import T3 from "../assets/T3.jpg";
import T4 from "../assets/T4.jpg";
import T5 from "../assets/T5.jpg";
import T6 from "../assets/T6.jpg";
import T7 from "../assets/T7.jpg";
import T8 from "../assets/T8.jpg";
import T9 from "../assets/T9.jpg";

const Carousel = () => {
  // Duplicate the images to create a seamless infinite scroll effect
  const images = [T1, T2, T3, T5, T8, T7, T9, T4, T6, T9,T1, T2, T3, T5, T8, T7, T9, T4, T6, T9];

  return (
    <div className="relative flex items-center justify-center w-full dark:text-gray-900 overflow-hidden">
      {/* Carousel Container */}
      <div className="flex items-center justify-start w-full h-full gap-6 py-4 mx-auto overflow-hidden">
        {/* Animated Carousel */}
        <div
          className="flex"
          style={{
            animation: "infinite-scroll 20s linear infinite",
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative flex-shrink-0 w-full sm:w-auto">
              <img
                className="object-cover object-center dark:bg-gray-500 h-96 aspect-square"
                src={image}
                alt={`Image ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Add custom CSS for the animation */}
      <style>
        {`
          @keyframes infinite-scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;