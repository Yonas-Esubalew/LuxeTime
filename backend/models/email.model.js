import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      // required: [true, "Provide email"],
      // unique: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    last_login_date: {
      type: Date,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const EmailModel = mongoose.model("Email", emailSchema);

export default EmailModel;
