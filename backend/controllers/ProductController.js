import CategoryModel from "../models/category.model.js";
import ProductModel from "../models/product.model.js"; // Adjust based on your project structure
import UserModel from "../models/user.model.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";

export const createProductController = async (req, res) => {
  try {
    const userId = req.user?.id;

    // Step 1: Fetch user details
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "❌ User not found" });
    }

    // Step 2: Validate user role (only admins can create products)
    if (user.role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "❌ Access denied. Admins only." });
    }

    // Step 3: Extract product details from request body
    const {
      name,
      image,
      categoryId,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
    } = req.body;

    // Step 4: Validate required fields
    // if (!name || !unit || !stock || !price) {
    //     return res.status(400).json({ message: "❌ Missing required fields (name, unit, stock, price)." });
    // }

    // // Step 5: Validate category and subcategory existence
    // const categories = await CategoryModel.find({ _id: { $in: categoryId } });

    // if (categories.length !== categoryId.length) {
    //     return res.status(400).json({ message: "❌ Invalid category or subcategory IDs provided." });
    // }

    // Step 6: Create new product
    const newProduct = new ProductModel({
      name,
      image,
      categoryId,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
      publish: true, // Set product as published by default
      userId: user._id, // Associate product with the admin user
    });

    // Step 7: Save product to the database
    await newProduct.save();

    // Step 8: Fetch the newly created product with full category & subcategory details
    const updatedProduct = await ProductModel.findById(newProduct._id).populate(
      "categoryId",
      "name image"
    ); // Populate category name & image
    console.log("✅ Product created successfully!");
    // Step 9: Return successful response with the fully populated product
    return res.status(201).json({
      message: "✅ Product created successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("❌ Error creating product:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

export const getAllProductsController = async (req, res) => {
  try {
    const { userId, role } = req.user;

    // // Step 1: Ensure only admins can fetch products
    // if (role !== "ADMIN") {
    //   return res
    //     .status(403)
    //     .json({ message: "❌ Access denied. Admins only." });
    // }

    // Step 2: Fetch products by userId & sort by created date (optional)
    const products = await ProductModel.find({ userId }).sort({ createdAt: 1 });

    // Step 3: Add sequential numbering
    const numberedProducts = products.map((product, index) => ({
      no: index + 1, // Sequential numbering (1-based index)
      ...product.toObject(), // Convert Mongoose document to plain object
    }));

    // Step 4: Send response with numbered structure
    res.status(200).json({
      message: "✅ Products retrieved successfully!",
      products: numberedProducts,
    });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

// 📌 Get product by userId and productId
export const getProductByIdController = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { id } = req.params;

    // if (role !== "ADMIN") {
    //   return res
    //     .status(403)
    //     .json({ message: "❌ Access denied. Admins only." });
    // }

    const product = await ProductModel.findOne({ _id: id, userId });

    if (!product) {
      return res
        .status(404)
        .json({ message: "❌ Product not found or not authorized" });
    }

    res.status(200).json({
      message: "✅ Product retrieved successfully!",
      product,
    });
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { role } = req.user; // Extract user role
    const { id: productId } = req.params;
    const {
      name,
      categoryId,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
      publish,
    } = req.body;

    // Step 1: Ensure only admins can update products
    if (role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "❌ Access denied. Admins only." });
    }

    // Step 2: Find the product by productId
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "❌ Product not found." });
    }

    // Step 3: Validate and update category & subcategory
    let updatedCategory = product.categoryId;

    if (categoryId) {
      const categories = await CategoryModel.find({ _id: { $in: categoryId } });
      if (categories.length !== categoryId.length) {
        return res
          .status(400)
          .json({ message: "❌ Invalid category ID(s) provided." });
      }
      updatedCategory = categoryId;
    }

    // Step 4: Update product details
    product.name = name || product.name;
    product.categoryId = updatedCategory;
    product.unit = unit || product.unit;
    product.stock = stock || product.stock;
    product.price = price || product.price;
    product.discount = discount || product.discount;
    product.description = description || product.description;
    product.more_details = more_details || product.more_details;
    product.publish = publish !== undefined ? publish : product.publish; // Allow toggle for publish

    // Step 5: Save updated product
    await product.save();

    // Step 6: Fetch the updated product with full category & subcategory details
    const updatedProduct = await ProductModel.findById(product._id)
      .populate("categoryId", "name image") // Populate category details

    // Step 7: Return updated product
    res.status(200).json({
      message: "✅ Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("❌ Error updating product:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

// 📌 Delete product by userId and productId
export const deleteProductController = async (req, res) => {
  try {
    const { userId, role } = req.user;
    const { id } = req.params;

    if (role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "❌ Access denied. Admins only." });
    }

    const deletedProduct = await ProductModel.findOneAndDelete({
      _id: id,
      userId,
    });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ message: "❌ Product not found or not authorized" });
    }

    res.status(200).json({
      message: "✅ Product deleted successfully!",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};


export async function uploadProductImage(req, res) {
  try {
    const file = req.file;
    const { productId } = req.body;

    if (!file) {
      return res.status(400).json({
        message: "No file uploaded.",
        error: true,
        success: false,
      });
    }

    const uploadImage = await uploadImageCloudinary(file);

    if (!uploadImage || !uploadImage.url) {
      return res.status(500).json({
        message: "Image upload failed.",
        error: true,
        success: false,
      });
    }

    let updatedProduct;

    if (productId) {
      updatedProduct = await ProductModel.findByIdAndUpdate(
        categoryId,
        { image: uploadImage.url },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({
          message: "Category not found.",
          error: true,
          success: false,
        });
      }
    }

    return res.json({
      message: "Image uploaded successfully.",
      data: updatedProduct || { image: uploadImage.url }, // fallback if no category update
      error: false,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}