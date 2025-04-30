import UserModel from "../models/user.model.js";

export async function SignupController(req, res) {
    try {

         // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "🚫 Unauthorized: Missing or invalid token" });
    }
    const accessToken = authHeader.split(" ")[1];
    // Fetch user info from Auth0
    const response = await axios.get(
      "https://dev-lb7ute8ee6lu4fpr.us.auth0.com/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const userinfo = response.data;
    const newAuth0Id = userinfo.sub;
    // Get the latest Auth0 ID
    console.log(userinfo);
    // Check if user already exists in the database by email or auth0Id
    let user = await UserModel.findOne({
      $or: [{ email: userinfo.email }, { auth0Id: userinfo.sub }],
    });

    // http://localhost:8080/api/auth0/email-verification

    if (!user) {
      const isSocialLogin = userinfo.email_verified === true;

      if (!isSocialLogin) {
        // Email registration (password is not handled here, just email verification)
        user = new UserModel({
          auth0Id: newAuth0Id,
          name: userinfo.name,
          email: userinfo.email,
          picture: userinfo.picture,
          provider: "auth0",
          isVerified: false, // Email verification is pending
          access_token: accessToken,
          refresh_token: "", // Not using refresh tokens in this flow
          last_login_date: Date.now(),
          role: "USER", // Default to user role
        });
        console.log("A verification email has been sent to the user. 📧");
      } else {
        // Social login (Google, Facebook, etc.)
        user = new UserModel({
          auth0Id: newAuth0Id,
          name: userinfo.name,
          email: userinfo.email,
          picture: userinfo.picture,
          provider: isSocialLogin ? newAuth0Id.split("|")[0] : "auth0",
          socialId: isSocialLogin ? newAuth0Id : null,
          isVerified: isSocialLogin || userinfo.email_verified,
          // ✅ Email users need verification
          access_token: accessToken,
          last_login_date: Date.now(),
          role: "USER",
        });
      }
      // Save user to the database
      await user.save();
      console.log("User saved to database successfully! 🎉");
    } else {
      // If user exists, update their login timestamp
      // ✅ **Update Auth0 ID If It Has Changed**
      if (user.auth0Id !== newAuth0Id) {
        console.log("🔄 Updating Auth0 ID for existing user...");
        user.auth0Id = newAuth0Id;
        user.provider = newAuth0Id.split("|")[0]; // Update provider if needed
      }
      user.last_login_date = Date.now();
      await user.save();
    }
    // Return the user information (can be extended based on needs)
    res.json({
      message: "User information retrieved successfully!",
      error: false,
      success: true,
      data: userinfo,
      isVerified: userinfo.email_verified,
      last_login_date: Date.now(), // Show verification status
    });
    } catch (error) {
    console.error("Error in /protected route:", error);
    if (error.response) {
      // Auth0 API error
      res
        .status(error.response.status)
        .json({ message: "❌ Error: " + error.response.data.message });
    } else if (error.request) {
      // Network error
      res
        .status(500)
        .json({ message: "❌ Network error: Unable to reach Auth0 🌐" });
    } else {
      // Unexpected error
      res.status(500).json({ message: "❌ Internal server error 🚨" });
    }
  }
}