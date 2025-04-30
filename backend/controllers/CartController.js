// Load environment variables
import dotenv from "dotenv";
// import paypal from '@paypal/checkout-server-sdk';
dotenv.config();

// Import necessary modules
import mongoose from "mongoose";
// import Stripe from "stripe";

// Import your models
import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

// // Initialize Stripe with secret key from .env
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-11-15", // ✅ optional but recommended for stability
// });
// console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY); // Should NOT be undefined

// // Configure PayPal environment
// const clientId = process.env.PAYPAL_CLIENT_ID;
// const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
// const paypalClient = new paypal.core.PayPalHttpClient(environment);

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user?.id; // Extract user ID from the authenticated request (set by verifyAccessToken)

    // Validate the quantity
    if (quantity <= 0) {
      return res.status(400).json({
        message: "❌ Invalid quantity. Quantity must be greater than 0.",
      });
    }

    // Check if the product already exists in the user's cart
    let cartItem = await CartProductModel.findOne({ userId, productId });

    if (cartItem) {
      // If the product already exists in the cart, increase the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If the product doesn't exist in the cart, create a new cart item
      cartItem = await CartProductModel.create({ userId, productId, quantity });
    }

    // Populate the cart item with product and user details
    await cartItem.populate([
      { path: "userId" }, // Populate user info (you can customize the fields to return)
      { path: "productId" }, // Populate product info (customize as needed)
    ]);

    // Update user's cart field (assuming you have a shopping_cart field in your User schema)
    await UserModel.findByIdAndUpdate(userId, {
      $push: { shopping_cart: cartItem._id }, // Push the cart item ID to the shopping_cart array
    });

    // Return response with the populated cart item
    res.status(201).json({
      message: "✅ Product added to cart successfully!",
      cart: cartItem, // Returning the populated cart item with full user and product details
    });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

export const getUserCart = async (req, res) => {
  try {
    const userId = req.user?.id; 
    if (!userId) {
      return res.status(401).json({ message: "❌ Unauthorized" });
    }
 
    const cartItems = await CartProductModel.find({ userId }).populate([
      { path: "productId" },
      { path: "userId", select: "name email" }, 
    ]);

    const formattedCart = cartItems.map((item) => ({
      id: item.productId?._id,
      name: item.productId?.name || "Unknown Product",
      image: item.productId?.image?.[0] || "",
      price: item.productId?.price || 0,
      quantity: item.quantity,
      stock: item.productId?.stock || 0,
      unit: item.productId?.unit || "",
      discount: item.productId?.discount || 0,
      cartItemId: item._id, // 🔥 this is helpful for deletion/editing
    }));
    

    console.log("cart", formattedCart);
    res.status(200).json({
      message: "✅ Cart retrieved successfully!",
      cart: formattedCart,
    });
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    res.status(500).json({
      message: "❌ Internal server error",
      error: error.message,
    });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { cartId } = req.params; // Get MongoDB ObjectId (_id) from params
    const { quantity } = req.body; // Get the quantity to update from the request body
    const userId = req.user?.id; // Extract the user ID from the request user

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({ message: "❌ Invalid cart ID format." });
    }

    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: "❌ Quantity must be greater than 0." });
    }

    // Find the cart item by _id and userId to ensure ownership
    const cartItem = await CartProductModel.findOne({ _id: cartId, userId });

    if (!cartItem) {
      return res
        .status(404)
        .json({ message: "❌ Cart item not found or unauthorized." });
    }

    // Update the quantity of the cart item
    cartItem.quantity = quantity;
    await cartItem.save();

    // Populate the product details before returning the response
    const updatedCartItem = await cartItem.populate("productId");

    res.status(200).json({
      message: "✅ Cart item updated successfully!",
      cartItem: {
        _id: updatedCartItem._id, // MongoDB ObjectId
        productId: updatedCartItem.productId, // Product details
        quantity: updatedCartItem.quantity, // Updated quantity
      },
    });
  } catch (error) {
    console.error("❌ Error updating cart item:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { cartId } = req.params;
    console.log("📦 Incoming cartId to delete:", cartId);

    const cartItem = await CartProductModel.findById(cartId);
    console.log("cartItem", cartItem);
    if (!cartItem) {
      return res.status(404).json({
        message: "❌ Cart item not found.",
      });
    }

    await CartProductModel.findByIdAndDelete(cartId);

    res.status(200).json({
      message: "✅ Cart item removed successfully!",
      data: cartItem,
    });
  } catch (error) {
    console.error("❌ Error removing cart item:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

export const clearUserCart = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "❌ Unauthorized. No user ID found." });
    }

    // Find and delete all cart items associated with the user
    const result = await CartProductModel.deleteMany({ userId });

    res.status(200).json({
      message: "🧹 Cart cleared successfully!",
      deletedCount: result.deletedCount, // optional: number of deleted items
    });
  } catch (error) {
    console.error("❌ Error clearing user cart:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

export const getAllCarts = async (req, res) => {
  try {
    // Check if the user has admin privileges
    if (req.user?.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "❌ Access denied. Admins only." });
    }

    // Fetch all carts and populate productId and userId details
    const carts = await CartProductModel.find().populate("productId userId");

    // Sequentially add sequence numbers to the carts
    const cartsWithSequence = carts.map((cart, index) => ({
      sequence: index + 1, // Adding sequence number (1-based index)
      cartItem: cart,
    }));

    res.status(200).json({
      message: "✅ All carts fetched successfully!",
      carts: cartsWithSequence, // Returning the carts with sequence
    });
  } catch (error) {
    console.error("❌ Error fetching carts:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

export const getUserCartByAdmin = async (req, res) => {
  try {
    // Check if the user has admin privileges
    if (req.user?.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "❌ Access denied. Admins only." });
    }

    // Extract userId from the request parameters
    const { userId } = req.params;

    // Fetch the user's cart and populate productId details
    const cart = await CartProductModel.find({ userId }).populate("productId");

    // Sequentially add sequence numbers to the cart items
    const cartWithSequence = cart.map((cartItem, index) => ({
      sequence: index + 1, // Adding sequence number (1-based index)
      cartItem, // The original cart item
    }));

    res.status(200).json({
      message: "✅ User cart fetched successfully!",
      cart: cartWithSequence, // Return the cart with sequence
    });
  } catch (error) {
    console.error("❌ Error fetching user cart:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};


// export const CheckOut = async (req, res, next) => {
//   try {
//     const cart = req.body;

//     if (!Array.isArray(cart) || cart.length === 0) {
//       return res.status(400).json({ message: "❌ Empty cart" });
//     }

//     const lineItems = cart.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//           images: [item.image],
//         },
//         unit_amount: Math.round(item.price * 100), // in cents
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url: `${process.env.FRONTEND_URL}/success`,
//       cancel_url: `${process.env.FRONTEND_URL}/cart`,
//     });

//     return res.status(200).json({
//       message: "✅ Session created",
//       url: session.url,
//     });
//   } catch (error) {
//     console.error("❌ Checkout Error:", error.message);
//     res.status(500).json({ message: error.message }); // ✅ This alone is safe
//   }
// };

// export const PayPalCheckOut = async (req, res) => {
//   try {
//     const cart = req.body;

//     if (!Array.isArray(cart) || cart.length === 0) {
//       return res.status(400).json({ message: "❌ Empty cart" });
//     }

//     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

//     const request = new paypal.orders.OrdersCreateRequest();
//     request.prefer("return=representation");
//     request.requestBody({
//       intent: "CAPTURE",
//       purchase_units: [{
//         amount: {
//           currency_code: "USD",
//           value: total.toFixed(2),
//         },
//       }],
//       application_context: {
//         return_url: `${process.env.FRONTEND_URL}/paypal-success`,
//         cancel_url: `${process.env.FRONTEND_URL}/cart`,
//       },
//     });

//     const order = await paypalClient.execute(request);

//     const approvalUrl = order.result.links.find(link => link.rel === "approve")?.href;

//     if (!approvalUrl) {
//       console.error("❌ No approval URL found in PayPal response");
//       return res.status(500).json({ message: "No approval URL returned from PayPal" });
//     }

//     res.status(200).json({ approvalUrl });

//   } catch (error) {
//     console.error("❌ PayPal Checkout Error:", error.message);
//     res.status(500).json({ message: error.message });
//   }
// };
