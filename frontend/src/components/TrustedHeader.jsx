import React from "react";

const TrustedNumber = () => {
  return (
    <section className="p-6 dark:bg-gray-100 dark:text-gray-800">
      <div>
        <h1 className="flex text-white font-bold text-5xl justify-center m-2 lg:m-6">About Us</h1>
      </div>
      <br></br>
      <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
        <div className="flex text-white flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">500
            <span className="text-yellow-600">K</span>+</p>
          <p className="text-sm sm:text-base">Customers</p>
        </div>
        <div className="flex  text-white flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">2.6<span className="text-yellow-600">M</span>+</p>
          <p className="text-sm sm:text-base">Followers on social media</p>
        </div>
        <div className="flex  text-white flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">56</p>
          <p className="text-sm sm:text-base">Main Stores</p>
        </div>
        <div className="flex  text-white flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">700+</p>
          <p className="text-sm sm:text-base">Watch Brands</p>
        </div>
        <div className="flex  text-white flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">17</p>
          <p className="text-sm sm:text-base">Success Selling Years</p>
        </div>
        <div className="flex  text-white flex-col justify-start m-2 lg:m-6">
          <p className="text-4xl font-bold leading-none lg:text-6xl">10+</p>
          <p className="text-sm sm:text-base">Main Shopping Center</p>
        </div>
      </div>
    </section>
  );
};

export default TrustedNumber;
