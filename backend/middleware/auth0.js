import axios from "axios";
import UserModel from "../models/user.model.js";

export const verifyAccessToken = async (req, res, next) => {
  try {
    // Extract Authorization Header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    // Extract the token
    const accessToken = authHeader.split(" ")[1];

    // 🛠️ Debugging: Log the token before request
    console.log("🔑 Received Token:", accessToken);

    if (!accessToken || accessToken.trim() === "") {
      return res.status(401).json({ message: "Unauthorized: Empty token" });
    }

    // ✅ Validate token with Auth0 and get user info
    const response = await axios.get("https://dev-lb7ute8ee6lu4fpr.us.auth0.com/userinfo", {
      headers: { 
        Authorization: `Bearer ${accessToken}`, 
        "Content-Type": "application/json"  // Ensure proper encoding
      },
    });

    const auth0User = response.data; // Extract Auth0 user info

    // 🛠️ Debugging: Log Auth0 response
    console.log("🔍 Auth0 User Info:", auth0User);

    // ✅ Find user in MongoDB by email (assuming email is unique)
    const user = await UserModel.findOne({ email: auth0User.email });

    if (!user) {
      return res.status(404).json({ message: "❌ User not found in database" });
    }

    // ✅ Attach user info to the request object
    req.user = {
      id: user._id,  // MongoDB User ID
      email: user.email,
      role: user.role // Example: "ADMIN"
    };

    console.log("✅ User Authenticated:", req.user);

    next();  // Continue to the next middleware
  } catch (error) {
    console.error("❌ Token verification failed:", error.response ? error.response.data : error);

    // Handle different error cases
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({ message: "Invalid or expired token", success: false });
      }
      if (error.response.status === 400) {
        return res.status(400).json({ message: "Bad request: Token might be malformed", success: false });
      }
    }

    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};


export const requireAdminRole = (req, res, next) => {
  if (req.user?.role !== "ADMIN") {
    return res.status(403).json({ message: "Forbidden: Admins only", success: false });
  }
  next();
};