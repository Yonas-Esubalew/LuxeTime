import Store1 from "../assets/Store1.jpg";
import Store3 from "../assets/Store3.jpg";
import Store2 from "../assets/Store2.jpg";
import Store5 from "../assets/Store5.jpg";

export const Content = () => {
  return (
    <div className="w-full bg-neutral-900 py-16 px-6 lg:py-24 lg:px-12">
      <div className="max-w-screen-xl mx-auto text-center">
        <p className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-white uppercase rounded-lg bg-gradient-to-r from-yellow-900 to-yellow-500  hover:from-yellow-500 hover:to-yellow-900 focus:ring-2 focus:ring-white">
          Shop Now
        </p>
        <h2 className="mb-6 text-4xl font-bold text-white sm:text-5xl">
          Experience the Art of Timekeeping – Stop by <span className="text-yellow-500">LuxeTime</span> Today!
        </h2>
        <p className="mb-8 text-lg text-gray-300">
          Welcome to <span className="text-yellow-500">LuxeTime</span>, your ultimate destination for exquisite timepieces that combine style, precision, and affordability. Whether you're searching for a luxury watch, a smartwatch, or a unique vintage piece, we have something for everyone.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-screen-xl mx-auto">
        {/* Images Grid */}
        <div className="grid grid-cols-2 gap-6">
          <img className="w-full h-64 col-span-2 object-cover rounded-lg shadow-lg" src={Store1} alt="Store Interior" />
          <img className="w-full h-48 object-cover rounded-lg shadow-lg" src={Store5} alt="Luxury Watches" />
          <img className="w-full h-48 object-cover rounded-lg shadow-lg" src={Store3} alt="Classic Watches" />
        </div>

        {/* Features Section */}
        <div className="flex flex-col justify-center text-white">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">Expert Watch Consultations</h3>
            <p className="text-gray-300">Our knowledgeable staff provides personalized consultations to help you find the perfect watch for any occasion.</p>
          </div>
          <div className="mb-6">
            <h3 className="text-2xl font-semibold">Watch Repair & Maintenance</h3>
            <p className="text-gray-300">Keep your timepiece in top condition with our professional repair and maintenance services.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold">Customization & Personalization</h3>
            <p className="text-gray-300">Make your watch unique with custom straps, dials, and engravings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
