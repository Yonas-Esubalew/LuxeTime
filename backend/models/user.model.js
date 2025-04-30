import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    auth0Id: { type: String, unique: true, sparse: true },
    name: { type: String },
    picture: { type: String },
    email: { type: String, 
      // required: [true, "Provide Email"], unique: true 
    },
    password: { type: String, select: false }, // Hide password when querying
    provider: {
      type: String,
      enum: ["auth0", "google-oauth2", "facebook", "apple"],
      // required: true,
    },
    socialId: { type: String, sparse: true },
    isVerified: { type: Boolean, default: false }, // ✅ Track email verification
    access_token: { type: String, default: "" },
    refresh_token: { type: String, default: "" },
    last_login_date: { type: Date, default: Date.now },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    avatar: {
      type: String,
      default: "",
      required: false,
    },
    mobile: {
      type: Number,
      default: null,
    },
    get_started_email:[
      {
        type: mongoose.Schema.ObjectId,
        ref: "Email",
      },
    ],
    bio: {
      type: String,
      default: null,
    },
    age: {
      type: Number,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    favorite_activity: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Suspended"],
      default: "Active",
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "address",
      },
    ],
    shopping_cart: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "CartProduct",
      },
    ],
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "order",
      },
    ],
    forgot_password_otp: {
      type: String,
      default: null,
    },
    forgot_password_expiry: {
      type: Date,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
