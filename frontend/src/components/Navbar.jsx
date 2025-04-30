import { useEffect, useState } from "react";
// import logo3 from "../assets/Screensh.png";
// import logo4 from "../assets/logo3.png";
// import Search from "./Search";
import useMobile from "../hooks/useMobile";
import {
  BsCart4,
  BsPerson,
  BsGift,
  BsGrid,
  BsBoxArrowRight,
  BsBag,
  BsFillStarFill,
} from "react-icons/bs";
import {
  FaSignInAlt,
  FaUserPlus,
  FaMap,
  FaInfoCircle,
  FaPhone,
  FaCog,
} from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";
import SummaryApi from "../common/SummaryApi.js";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice.js";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const {
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently,
  } = useAuth0();
  const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const userFetch = useSelector((state) => state?.user);
//   console.log("User From Header", userFetch);
//   const cartItems = useSelector((state) => state.cart.items);
//   console.log("cart from redux", cartItems);
  const totalItems = (cartItems || []).length;



  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!isAuthenticated || !user?.sub) {
        console.log("User not authenticated or missing user.sub");
        return;
      }

      try {
        console.log("🔍 Fetching Access Token...");
        const token = await getAccessTokenSilently();
        console.log("✅ Access Token Retrieved", token);

        console.log("🔍 Fetching User Data from API...");
        const response = await Axios({
          ...SummaryApi.userinfo,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response:", response);
        const receivedData = response.data?.data || response.data;

        if (receivedData) {
          console.log("📦 Received User Data:", receivedData);
        //   dispatch(setUserDetails(receivedData));
          toast.success("User data loaded successfully");
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        console.error("❌ Fetch Error:", error.response?.data || error.message);
        toast.error(
          error.response?.data?.message || "Failed to fetch user dat]);

  const handleLogin = () => {
    loginWithRedirect({
      authorizationParams: {
        screen_hint: "signup",
        prompt: "login",
      },
      appState: {
        returnTo: window.location.origin,
      },
    });
  };
  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
    localStorage.clear(); // Clear stored user data
    sessionStorage.clear(); // Extra cleanup
    window.location.reload(); // Force fresh login
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile] = useMobile();
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isFeaturesDropdownOpen, setIsFeaturesDropdownOpen] = useState(false);
  const [isPricingDropdownOpen, setIsPricingDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProductDropdownMenuOpen, setIsProductDropdownMenuOpen] =
    useState(false);
  const [isFeaturesDropdownMenuOpen, setIsFeaturesDropdownMenuOpen] =
    useState(false);
  const [isPricingDropdownMenuOpen, setIsPricingDropdownMenuOpen] =
    useState(false);
  const [isLanguageDropdownMenuOpen, setIsLanguageDropdownMenuOpen] =
    useState(false);
  const [currentLanguage, setCurrentLanguage] = useState({
    code: "en",
    name: "English",
    flag: "🇬🇧",
  });

  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  ];

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    setIsLanguageDropdownOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-neutral-800 px-4 py-5 mx-auto sm:max-w-xl md:max-w-full rounded-b-sm md:px-24 lg:px-8 h-20 z-50 fixed top-0 left-0 w-full text-white">
      <div className="relative flex items-center justify-between">
        <div className="">
          {!isMobile ? (
            <img className="w-full h-13" src={logo3} alt="Logo" />
          ) : (
            <img className="w-full h-13" src={logo4} alt="Logo" />
          )}
        </div>

        <div className="flex items-center">
          {/* Desktop Menu */}
          <ul className="flex ml-10 items-center hidden space-x-8 lg:flex">
            {/* Product Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setIsProductDropdownMenuOpen(true)}
              onMouseLeave={() => setIsProductDropdownMenuOpen(false)}
            >
              <a
                href="/"
                className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Product
              </a>
              {isProductDropdownMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-neutral-700 rounded-lg shadow-lg z-10">
                  <ul className="space-y-2 p-4">
                    <li>
                      <a
                        href="/watches"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        LuxeTime Watches
                      </a>
                    </li>
                    <li>
                      <a
                        href="/luxury-watches"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Luxury Collection
                      </a>
                    </li>
                    <li>
                      <a
                        href="/limited-edition"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Limited Editions
                      </a>
                    </li>
                    <li>
                      <a
                        href="/watch-accessories"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Watch Accessories
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Features Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setIsFeaturesDropdownMenuOpen(true)}
              onMouseLeave={() => setIsFeaturesDropdownMenuOpen(false)}
            >
              <a
                href="/"
                className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Features
              </a>
              {isFeaturesDropdownMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-neutral-700 rounded-lg shadow-lg z-10">
                  <ul className="space-y-2 p-4">
                    <li>
                      <a
                        href="/customizable-features"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Customizable Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="/watch-details"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Watch Details
                      </a>
                    </li>
                    <li>
                      <a
                        href="/water-resistant"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Water-Resistant Technology
                      </a>
                    </li>
                    <li>
                      <a
                        href="/movement-types"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Movement Types
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>

            {/* Pricing Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setIsPricingDropdownMenuOpen(true)}
              onMouseLeave={() => setIsPricingDropdownMenuOpen(false)}
            >
              <a
                href="/"
                className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Pricing
              </a>
              {isPricingDropdownMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-neutral-700 rounded-lg shadow-lg z-10">
                  <ul className="space-y-2 p-4">
                    <li>
                      <a
                        href="/standard-pricing"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Standard Pricing
                      </a>
                    </li>
                    <li>
                      <a
                        href="/subscription-model"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Subscription Model
                      </a>
                    </li>
                    <li>
                      <a
                        href="/special-offers"
                        className="block text-white hover:text-deep-purple-accent-400"
                      >
                        Special Offers
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>
        <div>
          <Search />
        </div>

        {/* Desktop Right Side - Login / Sign up */}
        <ul className="flex items-center hidden space-x-8 lg:flex">
          {/* Language Selector */}
          <li
            className="relative"
            onMouseEnter={() => setIsLanguageDropdownMenuOpen(true)}
            onMouseLeave={() => setIsLanguageDropdownMenuOpen(false)}
          >
            <button className="flex items-center font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400">
              <span className="mr-1 text-lg">{currentLanguage.flag}</span>
              <span className="text-sm">
                {currentLanguage.code.toUpperCase()}
              </span>
              <IoMdArrowDropdown className="ml-1" />
            </button>

            {isLanguageDropdownMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-neutral-700 rounded-lg shadow-lg z-10">
                <ul className="space-y-2 p-2">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => handleLanguageChange(lang)}
                        className={`flex items-center w-full px-3 py-2 text-left rounded-md ${
                          currentLanguage.code === lang.code
                            ? "bg-yellow-600 text-white"
                            : "hover:bg-neutral-600"
                        }`}
                      >
                        <span className="mr-2 text-lg">{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          <li>
            <a
              onClick={handleLogin}
              href="/"
              className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
            >
              Sign Up
            </a>
          </li>

          <div>
            <button
              onClick={() => navigate("/cart")}
              className=" gap-2 bg-gradient-to-r from-yellow-900 to-yellow-500  hover:from-yellow-500 hover:to-yellow-900 focus:ring-2 focus:ring-white inline-flex items-center justify-center px-4 py-3 font-semibold tracking-wide text-white transition duration-300 rounded-lg shadow-md md:w-auto"
            >
              <div className="animate-bounce">
                <BsCart4 size={26} />
              </div>
              <div className="font-semibold text-sm">
                {totalItems > 0 ? (
                  <>
                    <span className="text-green-500 font-bold text-base">
                      {totalItems}
                    </span>{" "}
                    items
                  </>
                ) : (
                  "My Cart"
                )}
              </div>
            </button>
          </div>

          {/* This */}
          <div>
            {!isAuthenticated ? (
              <button
                aria-label={"User Profile"}
                title={"User Profile"}
                className={`transition duration-200 focus:outline-none focus:shadow-outline p-1 cursor-pointer rounded-full bg-neutral-600 hover:bg-neutral-500`}
                onClick={() => setIsMenuOpen(true)}
              >
                <div className="relative w-9 h-9 flex items-center justify-center rounded-full border-2 border-neutral-600 bg-neutral-700 text-white">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.42 0-8 3.58-8 8 0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-4.42-3.58-8-8-8z"
                    />
                  </svg>
                </div>
              </button>
            ) : (
              <div className="w-10 h-10 rounded-full border border-amber-100 overflow-hidden">
                <img
                  src={userFetch.avatar || userFetch.picture}
                  onClick={() => setIsMenuOpen(true)}
                  alt="User Profile"
                  className="w-full h-full object-cover cursor-pointer" // ✅ Makes sure the image fits properly
                />
              </div>
            )}

            {/* When After Registration profile*/}
            {isMenuOpen && (
              <div className="fixed inset-0 z-50 flex justify-between ">
                {/* Overlay */}
                <div className="" onClick={() => setIsMenuOpen(false)}></div>

                {/* Menu Container */}
                <div className="absolute right-0 w-60 top-0 border-l-xl border-l-gray-600 rounded-lg h-full bg-neutral-800 bg-opacity-95 p-5 overflow-y-auto">
                  <div className="flex items-center justify-between mb-4 sticky top-[-20px] bg-neutral-800 pt-4 pb-2">
                    {isAuthenticated ? (
                      <div className="w-10 h-10 rounded-full border border-amber-100 overflow-hidden">
                        <img
                          src={userFetch.avatar || userFetch.picture}
                          onClick={() => setIsMenuOpen(true)}
                          alt="User Profile"
                          className="w-full h-full object-cover cursor-pointer" // ✅ Makes sure the image fits properly
                        />
                      </div>
                    ) : (
                      <button
                        aria-label={"User Profile"}
                        title={"User Profile"}
                        className={`transition duration-200 focus:outline-none focus:shadow-outline p-1 cursor-pointer rounded-full bg-neutral-600 hover:bg-neutral-500`}
                      >
                        <div className="relative w-9 h-9 flex items-center justify-center rounded-full border-2 border-neutral-600 bg-neutral-700 text-white">
                          <svg className="w-6 h-6" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.42 0-8 3.58-8 8 0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-4.42-3.58-8-8-8z"
                            />
                          </svg>
                        </div>
                      </button>
                    )}

                    <button
                      className="p-2 transition duration-200 rounded text-white hover:bg-gray-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <nav className="pb-8">
                    <ul className="space-y-4 text-white">
                      {isAuthenticated && (
                        <li className="flex items-center gap-3">
                          <BsPerson />
                          <a href="/dashboard/profile">
                            {userFetch?.role === "ADMIN"
                              ? "ADMIN" + " " + userFetch.name ||
                                userFetch.email ||
                                "Admin Profile"
                              : userFetch.name || userFetch.email || "Profile"}
                          </a>
                        </li>
                      )}
                      {isAuthenticated && (
                        <li className="flex items-center gap-3">
                          <BsGrid />
                          {userFetch?.role === "ADMIN" ? (
                            <a href="/dashboard">Admin Dashboard</a>
                          ) : (
                            <a href="/dashboard"> Dashboard</a>
                          )}
                        </li>
                      )}

                      {/* Product Dropdown */}
                      <li>
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() =>
                            setIsProductDropdownOpen(!isProductDropdownOpen)
                          }
                        >
                          <div className="flex items-center gap-3">
                            <BsBag />
                            <span>Product</span>
                          </div>
                          <IoMdArrowDropdown />
                        </div>
                        {isProductDropdownOpen && (
                          <ul className="ml-6 mt-2 space-y-2">
                            <li>
                              <a href="/product-section/luxetime-watches">
                                LuxeTime Watches
                              </a>
                            </li>
                            <li>
                              <a href="/product-section/luxury-watch">
                                Luxury Collection
                              </a>
                            </li>
                            <li>
                              <a href="/product-section/limited-edition">
                                Limited Editions
                              </a>
                            </li>
                            <li>
                              <a href="/product-section/watch-accessories">
                                Watch Accessories
                              </a>
                            </li>
                          </ul>
                        )}
                      </li>

                      {/* Features Dropdown */}
                      <li>
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() =>
                            setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen)
                          }
                        >
                          <div className="flex items-center gap-3">
                            <BsFillStarFill />
                            <span>Features</span>
                          </div>
                          <IoMdArrowDropdown />
                        </div>
                        {isFeaturesDropdownOpen && (
                          <ul className="ml-6 mt-2 space-y-2">
                            <li>
                              <a href="/features/custom-feature">
                                Customizable Features
                              </a>
                            </li>
                            <li>
                              <a href="/features/watch-details">
                                Watch Details
                              </a>
                            </li>
                            <li>
                              <a href="/features/water-resist">
                                Water-Resistant Technology
                              </a>
                            </li>
                            <li>
                              <a href="/features/movement-types">
                                Movement Types
                              </a>
                            </li>
                          </ul>
                        )}
                      </li>

                      {/* Pricing Dropdown */}
                      <li>
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() =>
                            setIsPricingDropdownOpen(!isPricingDropdownOpen)
                          }
                        >
                          <div className="flex items-center gap-3">
                            <BsCart4 />
                            <span>Pricing</span>
                          </div>
                          <IoMdArrowDropdown />
                        </div>
                        {isPricingDropdownOpen && (
                          <ul className="ml-6 mt-2 space-y-2">
                            <li>
                              <a href="/product-pricing/standard-pricing">
                                Standard Pricing
                              </a>
                            </li>
                            <li>
                              <a href="/product-pricing/subscription-model">
                                Subscription Model
                              </a>
                            </li>
                            <li>
                              <a href="/product-pricing/special-offers">
                                Special Offers
                              </a>
                            </li>
                          </ul>
                        )}
                      </li>

                      {/* Language Selector for Mobile */}
                      <li>
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() =>
                            setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                          }
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg">
                              {currentLanguage.flag}
                            </span>
                            <span>Language ({currentLanguage.name})</span>
                          </div>
                          <IoMdArrowDropdown />
                        </div>
                        {isLanguageDropdownOpen && (
                          <ul className="ml-6 mt-2 space-y-2">
                            {languages.map((lang) => (
                              <li key={lang.code}>
                                <button
                                  onClick={() => handleLanguageChange(lang)}
                                  className={`flex items-center w-full px-3 py-2 text-left rounded-md ${
                                    currentLanguage.code === lang.code
                                      ? "bg-yellow-600 text-white"
                                      : "hover:bg-neutral-600"
                                  }`}
                                >
                                  <span className="mr-2 text-lg">
                                    {lang.flag}
                                  </span>
                                  <span>{lang.name}</span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>

                      <li className="flex items-center gap-3">
                        <BsGift />
                        <a href="/gift-card">Gift-Cards</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaMap />
                        <a href="/site-map">Site-Map</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaCog />
                        <a href="/setting">Settings</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaInfoCircle />
                        <a href="/about">About Us</a>
                      </li>
                      <li className="flex items-center gap-3">
                        <FaPhone />
                        <a href="/contact">Contact Us</a>
                      </li>

                      {/* Sign Up Button */}
                      <li>
                        <a
                          onClick={handleLogin}
                          href="/signup"
                          className="flex items-center justify-center w-full px-5 py-3 mt-4 font-semibold tracking-wide text-white transition bg-gradient-to-r from-yellow-900 to-yellow-500 hover:from-yellow-500 hover:to-yellow-900 focus:ring-2 focus:ring-white rounded-lg shadow-md hover:bg-yellow-800"
                        >
                          <FaUserPlus className="mr-2" />
                          Sign Up
                        </a>
                      </li>

                      {isAuthenticated && (
                        <li className="flex items-center gap-3">
                          <FaSignInAlt />
                          <a onClick={handleLogin} href="/">
                            Login
                          </a>
                        </li>
                      )}
                      {isAuthenticated && (
                        <li className="flex items-center gap-3">
                          <BsBoxArrowRight />
                          <a onClick={handleLogout} href="/">
                            Log Out
                          </a>
                        </li>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </ul>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            aria-label={isAuthenticated ? "User Profile" : "Open Menu"}
            title={isAuthenticated ? "User Profile" : "Open Menu"}
            className={`transition duration-200 focus:outline-none focus:shadow-outline ${
              isAuthenticated
                ? "p-1 cursor-pointer rounded-full  bg-neutral-600 hover:bg-neutral-500"
                : "p-2 rounded hover:bg-gray-600"
            }`}
            onClick={() => setIsMenuOpen(true)}
          >
            {isAuthenticated ? (
              // User Profile Icon (Circular with Border)
              <div className="w-10 h-10 rounded-full border border-amber-100 overflow-hidden">
                <img
                  src={userFetch.avatar || userFetch.picture}
                  onClick={() => setIsMenuOpen(true)}
                  alt="User Profile"
                  className="w-full h-full object-cover cursor-pointer" // ✅ Makes sure the image fits properly
                />
              </div>
            ) : (
              // Hamburger Menu Icon
              <svg
                className="w-6 text-white cursor-pointer"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1-0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1-0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1-0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            )}
          </button>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="fixed inset-0 z-50">
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMenuOpen(false)}
              ></div>

              {/* Menu Container */}
              <div className="absolute w-full top-0 left-0 h-full  bg-neutral-800 bg-opacity-95 p-5 overflow-y-auto">
                <div className="flex items-center justify-between mb-4 sticky top-[-20px] bg-neutral-800 pt-4 pb-2">
                  {isAuthenticated ? (
                    <div className="w-10 h-10 rounded-full border border-amber-100 overflow-hidden">
                      <img
                        src={userFetch.avatar || userFetch.picture}
                        onClick={() => setIsMenuOpen(true)}
                        alt="User Profile"
                        className="w-full h-full object-cover cursor-pointer" // ✅ Makes sure the image fits properly
                      />
                    </div>
                  ) : (
                    <button
                      aria-label={"User Profile"}
                      title={"User Profile"}
                      className={`transition duration-200 focus:outline-none focus:shadow-outline p-1 cursor-pointer rounded-full bg-neutral-600 hover:bg-neutral-500`}
                    >
                      <div className="relative w-9 h-9 flex items-center justify-center rounded-full border-2 border-neutral-600 bg-neutral-700 text-white">
                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.42 0-8 3.58-8 8 0 .55.45 1 1 1h14c.55 0 1-.45 1-1 0-4.42-3.58-8-8-8z"
                          />
                        </svg>
                      </div>
                    </button>
                  )}

                  <button
                    className="p-2 transition duration-200 rounded text-white hover:bg-gray-600"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    ✕
                  </button>
                </div>

                <nav className="pb-8">
                  <ul className="space-y-4 text-white">
                    {isAuthenticated && (
                      <li className="flex items-center gap-3">
                        <BsPerson />
                        <a href="/dashboard/profile">
                          {userFetch?.role === "ADMIN"
                            ? "ADMIN" + " " + userFetch.name ||
                              userFetch.email ||
                              "Admin Profile"
                            : userFetch.name || userFetch.email || "Profile"}
                        </a>
                      </li>
                    )}
                    {isAuthenticated && (
                      <li className="flex items-center gap-3">
                        <BsGrid />
                        {userFetch?.role === "ADMIN" ? (
                          <a href="/dashboard">Admin Dashboard</a>
                        ) : (
                          <a href="/dashboard"> Dashboard</a>
                        )}
                      </li>
                    )}

                    {/* Product Dropdown */}
                    <li>
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          setIsProductDropdownOpen(!isProductDropdownOpen)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <BsBag />
                          <span>Product</span>
                        </div>
                        <IoMdArrowDropdown />
                      </div>
                      {isProductDropdownOpen && (
                        <ul className="ml-6 mt-2 space-y-2">
                          <li>
                            <a href="/product-section/luxetime-watches">
                              LuxeTime Watches
                            </a>
                          </li>
                          <li>
                            <a href="/product-section/luxury-watch">
                              Luxury Collection
                            </a>
                          </li>
                          <li>
                            <a href="/product-section/limited-edition">
                              Limited Editions
                            </a>
                          </li>
                          <li>
                            <a href="/product-section/watch-accessories">
                              Watch Accessories
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Features Dropdown */}
                    <li>
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          setIsFeaturesDropdownOpen(!isFeaturesDropdownOpen)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <BsFillStarFill />
                          <span>Features</span>
                        </div>

                        <IoMdArrowDropdown />
                      </div>
                      {isFeaturesDropdownOpen && (
                        <ul className="ml-6 mt-2 space-y-2">
                          <li>
                            <a href="/features/custom-feature">
                              Customizable Features
                            </a>
                          </li>
                          <li>
                            <a href="/features/watch-details">Watch Details</a>
                          </li>
                          <li>
                            <a href="/features/water-resist">
                              Water-Resistant Technology
                            </a>
                          </li>
                          <li>
                            <a href="/features/movement-types">
                              Movement Types
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Pricing Dropdown */}
                    <li>
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          setIsPricingDropdownOpen(!isPricingDropdownOpen)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <BsCart4 />
                          <span>Pricing</span>
                        </div>
                        <IoMdArrowDropdown />
                      </div>
                      {isPricingDropdownOpen && (
                        <ul className="ml-6 mt-2 space-y-2">
                          <li>
                            <a href="/product-pricing/standard-pricing">
                              Standard Pricing
                            </a>
                          </li>
                          <li>
                            <a href="/product-pricing/subscription-model">
                              Subscription Model
                            </a>
                          </li>
                          <li>
                            <a href="/product-pricing/special-offers">
                              Special Offers
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>

                    {/* Language Selector for Mobile */}
                    <li>
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() =>
                          setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                        }
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg">
                            {currentLanguage.flag}
                          </span>
                          <span>Language ({currentLanguage.name})</span>
                        </div>
                        <IoMdArrowDropdown />
                      </div>
                      {isLanguageDropdownOpen && (
                        <ul className="ml-6 mt-2 space-y-2">
                          {languages.map((lang) => (
                            <li key={lang.code}>
                              <button
                                onClick={() => handleLanguageChange(lang)}
                                className={`flex items-center w-full px-3 py-2 text-left rounded-md ${
                                  currentLanguage.code === lang.code
                                    ? "bg-yellow-600 text-white"
                                    : "hover:bg-neutral-600"
                                }`}
                              >
                                <span className="mr-2 text-lg">
                                  {lang.flag}
                                </span>
                                <span>{lang.name}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>

                    <li className="flex items-center gap-3">
                      <BsGift />
                      <a href="/gift-card">Gift-Cards</a>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaMap />
                      <a href="/site-map">Site-Map</a>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaCog />
                      <a href="/setting">Settings</a>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaInfoCircle />
                      <a href="/about">About Us</a>
                    </li>
                    <li className="flex items-center gap-3">
                      <FaPhone />
                      <a href="/contact">Contact Us</a>
                    </li>

                    {/* Sign Up Button */}
                    <li>
                      <a
                        onClick={handleLogin}
                        href="/signup"
                        className="flex items-center justify-center w-full px-5 py-3 mt-4 font-semibold tracking-wide text-white transition bg-gradient-to-r from-yellow-900 to-yellow-500 hover:from-yellow-500 hover:to-yellow-900 focus:ring-2 focus:ring-white rounded-lg shadow-md hover:bg-yellow-800"
                      >
                        <FaUserPlus className="mr-2" />
                        Sign Up
                      </a>
                    </li>

                    {isAuthenticated && (
                      <li className="flex items-center gap-3">
                        <FaSignInAlt />
                        <a onClick={handleLogin} href="/">
                          Login
                        </a>
                      </li>
                    )}
                    {isAuthenticated && (
                      <li className="flex items-center gap-3">
                        <BsBoxArrowRight />
                        <a onClick={handleLogout} href="/">
                          Log Out
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
