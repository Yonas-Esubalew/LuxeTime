import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import HeroSection1 from "../components/HeroSection";

const Home = () => {
  // const { user, loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
  // const [userInfo, setUserInfo] = useState(null);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     if (!isAuthenticated) return;

  //     try {
  //       setLoading(true);
  //       const token = await getAccessTokenSilently();

  //       const response = await axios.post(
  //         "http://localhost:8080/api/user/auth0/signup", // Update this if your endpoint changes
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       setUserInfo(response.data.data);
  //     } catch (err) {
  //       console.error("Error fetching user:", err.response?.data || err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, [isAuthenticated]);

  return (
    <section className="bg-neutral-900">
      <div className="container mx-auto border  w-full bg-neutral-900 relative">
        <div className="w-full h-full">
          <Navbar />
        </div> 
        <div className="w-full bg-neutral-900 p-6 rounded-lg shadow-md">
          <HeroSection1 />
        </div>
      
      
      </div> 
    </section>
  );
};

export default Home;
