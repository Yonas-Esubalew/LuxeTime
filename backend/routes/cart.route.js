import express from "express";
import {
  addToCart,
  getUserCart,
  updateCartItem,
  removeCartItem,
  getAllCarts,
  getUserCartByAdmin,
  clearUserCart,
//   CheckOut,
//   PayPalCheckOut
} from "../controllers/CartController.js";
import { verifyAccessToken } from "../middleware/auth0.js";


const CartRouter = express.Router();

// User routes
CartRouter.post("/", verifyAccessToken, addToCart);
CartRouter.get("/", verifyAccessToken, getUserCart);
CartRouter.delete("/clear", verifyAccessToken, clearUserCart)
// CartRouter.post("/checkout", verifyAccessToken, CheckOut);
// CartRouter.post("/paypal-checkout", verifyAccessToken, PayPalCheckOut);
CartRouter.put("/:cartId", verifyAccessToken, updateCartItem);
CartRouter.delete("/:cartId", verifyAccessToken, removeCartItem);


// Admin routes
CartRouter.get("/admin/carts", verifyAccessToken, getAllCarts);
CartRouter.get("/admin/cart/:userId", verifyAccessToken, getUserCartByAdmin);

export default CartRouter;


