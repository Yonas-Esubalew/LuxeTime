import EmailModel from "../models/email.model.js";
import UserModel from "../models/user.model.js";

export const createEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const userId = req.user?.id; // Extract user ID from the authenticated request

    if (!email) {
      return res.status(400).json({ message: "❌ Email is required." });
    }

    // Check if email already exists
    let existingEmail = await EmailModel.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "❌ Email already exists." });
    }

    // Step 1: Create and save the email
    const newEmail = await EmailModel.create({ email, userId });

    // Step 2: Push email reference to the user's `get_started_email`
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { $push: { get_started_email: newEmail._id } },
      { new: true } // Return updated user
    ).populate("get_started_email"); // Populate the email details

    res.status(201).json({
      message: "✅ Email added successfully!",
      email: newEmail,
      user: updatedUser, // Return user with updated emails
    });
  } catch (error) {
    console.error("❌ Error adding email:", error);
    res.status(500).json({ message: "❌ Internal server error", error: error.message });
  }
};

export const getUserEmails = async (req, res) => {
    try {
      const userId = req.user?.id;
  
      // Fetch the user and populate `get_started_email`
      const user = await UserModel.findById(userId).populate("get_started_email");
  
      if (!user) {
        return res.status(404).json({ message: "❌ User not found." });
      }
  
      res.status(200).json({
        message: "✅ User emails fetched successfully!",
        emails: user.get_started_email,
      });
    } catch (error) {
      console.error("❌ Error fetching emails:", error);
      res.status(500).json({ message: "❌ Internal server error", error: error.message });
    }
  };
  