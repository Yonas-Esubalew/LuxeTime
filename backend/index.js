import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
// import passport from "passport";
// import session from "express-session";
// import { expressjwt } from "express-jwt";
// import jwks from "jwks-rsa";
// import axios from "axios";
// Import database connection & routes
import connectDB from "./config/connectDB.js";
// import userRouter from "./routes/user.route.js";
// import router from "./routes/authRoute.js";
// import UserModel from "./models/user.model.js";
// import multer from "multer";
// import uploadImageCloudinary from "./utils/uploadImageCloudinary.js";
// import AddressRouter from "./routes/address.route.js";
// import ProductRouter from "./routes/product.route.js";
// import CategoryRouter from "./routes/category.route.js";
// import OrderRouter from "./routes/order.route.js";
// import CartRouter from "./routes/cart.route.js";
// import EmailRouter from "./routes/email.router.js";
// import uploadRouter from "./routes/upload.route.js";
// import paypal from "@paypal/checkout-server-sdk";
// import openAiRouter from "./routes/openAiRoutes.js";
dotenv.config();
const app = express();

app.use(
  cors({
    credentials: true, // Allow credentials (cookies, headers)
    origin: process.env.FRONTEND_URL, // Allow requests from this origin
    methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
    allowedHeaders: "Content-Type,Authorization", // Allowed headers
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  })
);


app.use(() => {
    const error = new Error("Not Error");
    error.status = 401;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "Internal server error";
    res.status(status).send(message);
  });
  
  // Start Server After Connecting to Database
  const PORT = process.env.PORT || 8080;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🔥 Server is Running on PORT ${PORT}`);
    });
  });
  