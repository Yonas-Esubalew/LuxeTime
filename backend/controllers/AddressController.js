import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";
// 📌 Create a new address for the authenticated user
export const createAddressController = async (req, res) => {
  try {
    const { email } = req.user; // Extracted from middleware
    const { address_line, city, state, pincode, country, mobile, status } =
      req.body;

    // Create a new address entry
    const newAddress = new AddressModel({
      address_line,
      city,
      state,
      pincode,
      country,
      mobile,
      status,
    });

    const savedAddress = await newAddress.save();

    // ✅ Option 1: Replace old address (only 1 address stored per user)
    const updatedUser = await UserModel.findOneAndUpdate(
      { email },
      { address_details: [savedAddress._id] }, // Replace old address
      { new: true }
    ).populate("address_details");

    

    if (!updatedUser) {
      return res.status(404).json({ message: "❌ User not found" });
    }

    res.status(201).json({
      message: "✅ Address created successfully!",
      address: savedAddress,
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Error creating address:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};

export const getUserAddressesController = async (req, res) => {
  try {
    const { id: userId } = req.user; // Extract user ID from middleware

    const user = await UserModel.findById(userId).populate({
      path: "address_details",
      options: { sort: { createdAt: -1 } },
    });

   
    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }

   
    const numberedAddresses = user.address_details.map((address, index) => ({
      no: index + 1, // 
      ...address.toObject() // 
    }));

    
    const latestAddress = numberedAddresses.length > 0 ? numberedAddresses[0] : null;

    
    res.status(200).json({
      message: "✅ User addresses retrieved successfully!",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      latest_address: latestAddress, // Latest address separately
      addresses: numberedAddresses, // Full numbered addresses
    });
  } catch (error) {
    console.error("❌ Error fetching user addresses:", error);
    res.status(500).json({ message: "❌ Internal server error", error: error.message });
  }
};

// 📌 Get an address by address ID (Only if it belongs to the authenticated user)
export const getAddressByIdController = async (req, res) => {
    try {
      const { id } = req.params; // Address ID from the URL parameters
      const { userId } = req.user; // Assuming user ID is stored in req.user by authentication middleware
  
      // Find the address by ID, ensuring it belongs to the authenticated user
      const address = await AddressModel.findOne({ _id: id, userId });
  
      if (!address) {
        return res.status(404).json({ message: "❌ Address not found or not authorized" });
      }
  
      res.status(200).json({
        message: "✅ Address retrieved successfully by ID!",
        address, // Send the address details
      });
    } catch (error) {
      console.error("❌ Error fetching address:", error);
      res.status(500).json({ message: "❌ Internal server error" });
    }
  };
  
// 📌 Update by address ID (Only if it belongs to the authenticated user)
export const updateAddressController = async (req, res) => {
    try {
      const { id } = req.params; // Address ID from the URL parameters
      const { userId } = req.user; // Assuming user ID is stored in req.user by authentication middleware
  
      // Find and update the address by ID, ensuring the authenticated user owns it
      const updatedAddress = await AddressModel.findOneAndUpdate(
        { _id: id, userId }, // Ensure the address belongs to the authenticated user
        req.body, // The update data from the request body
        { new: true } // Return the updated document
      );
  
      if (!updatedAddress) {
        return res
          .status(404)
          .json({ message: "❌ Address not found or not authorized" });
      }
  
      res.status(200).json({
        message: "✅ Address updated successfully!",
        address: updatedAddress,
      });
    } catch (error) {
      console.error("❌ Error updating address:", error);
      res.status(500).json({ message: "❌ Internal server error" });
    }
  };
  
// 📌 Delete an address by ID (Only if it belongs to the authenticated user)
export const deleteAddressController = async (req, res) => {
  try {
    const { id } = req.params; // Address ID from the URL parameters
    const { userId } = req.user; // Assuming the user's ID is stored in req.user by authentication middleware

    // Find and delete the address by ID, ensuring the authenticated user owns it
    const deletedAddress = await AddressModel.findOneAndDelete({
      _id: id,
      userId, // Ensure the address belongs to the authenticated user
    });

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ message: "❌ Address not found or not authorized" });
    }

    res.status(200).json({
      message: "✅ Address deleted successfully!",
      address: deletedAddress,
    });
  } catch (error) {
    console.error("❌ Error deleting address:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};
