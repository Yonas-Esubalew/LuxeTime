import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Home = () => {
  const { user, loginWithRedirect, logout, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isAuthenticated) return;

      try {
        setLoading(true);
        const token = await getAccessTokenSilently();

        const response = await axios.post(
          "http://localhost:8080/api/user/auth0/signup", // Update this if your endpoint changes
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserInfo(response.data.data);
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [isAuthenticated]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Auth0 Login / Signup Demo</h1>

      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="bg-blue-600 text-white px-6 py-2 rounded "
        >
          Login / Signup
        </button>
      ) : (
        <>
          <button
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
            className="bg-red-600 text-white px-6 py-2 rounded mb-4"
          >
            Logout
          </button>

          {loading ? (
            <p>Loading user info...</p>
          ) : userInfo ? (
            <div>
              <h2 className="text-lg font-semibold">Welcome, {userInfo.name}</h2>
              <pre className="bg-gray-100 p-4 rounded mt-2">{JSON.stringify(userInfo, null, 2)}</pre>
            </div>
          ) : (
            <p>User info not available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
