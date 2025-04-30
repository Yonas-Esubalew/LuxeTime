import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 rounded-xl pt-4 pb-8 xl:pt-8">
      <div className="max-w-screen-lg px-4 mx-auto text-gray-300 xl:max-w-screen-xl sm:px-6 md:px-8">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-lg font-light pb-8">
          {/* Components Column */}
          <li>
            <h2 className="text-white font-bold text-md uppercase mb-4">Components</h2>
            <ul>
              <li className="mb-4 hover:text-gray-400"><a href="/compare-products">Compare Products</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="#">Forms</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="#">Watches</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="/wishlist">Wishlist</a></li>
            </ul>
          </li>
          
          {/* Contacts Column */}
          <li>
            <h2 className="text-white font-bold text-md uppercase mb-4">Contacts</h2>
            <ul>
              <li className="mb-4 hover:text-gray-400"><a href="#">Github</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="#">Facebook</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="#">Twitter</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="#">LinkedIn</a></li>
            </ul>
          </li>
          
          {/* Customization Column */}
          <li>
            <h2 className="text-white font-bold text-md uppercase mb-4">Customization</h2>
            <ul>
              <li className="mb-4 hover:text-gray-400"><a  href="/setting">Settings</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="#">Collection</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="#">Plugins</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="/site-map">Site Map</a></li>
            </ul>
          </li>
          
          {/* Company Column */}
          <li>
            <h2 className="text-white font-bold text-md uppercase mb-4">LuxeTime</h2>
            <ul>
              <li className="mb-4 hover:text-gray-400"><a href="/about">About Us</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="/carears">Careers</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="/privacy-policy">Privacy Policy</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="/terms-of-services">Terms of Service</a></li>
            </ul>
          </li>
          
          {/* Support Column */}
          <li>
            <h2 className="text-white font-bold text-md uppercase mb-4">Support</h2>
            <ul>
              <li className="mb-4 hover:text-gray-400"><a href="/help-center">Help Center</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="/FAQs">FAQ</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="/contact">Contact Us</a></li>
              <li className="mb-4 hover:text-gray-400"><a href="/live-chat">Live Chat</a></li>
            </ul>
          </li>
        </ul>
        
        {/* Footer Bottom Section */}
        <div className="text-center pt-8 border-t border-gray-600">
          <p className="text-sm">© 2025 LuxeTime. All Rights Reserved.</p>
          <p className="text-sm">Unauthorized use or duplication of content without permission is prohibited.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
