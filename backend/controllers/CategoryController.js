import CategoryModel from "../models/category.model.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
/**
 * ✅ Create a new category (Admin only)
 */
export const createCategoryController = async (req, res) => {
  try {
    const { role } = req.user; // Extract role from authentication middleware

    if (role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "❌ Access denied. Admins only." });
    }

    const { name, image } = req.body;

    if (!name) {
      return res.status(400).json({ message: "❌ Category name is required." });
    }

    const newCategory = new CategoryModel({ name, image });
    await newCategory.save();

    res.status(201).json({
      message: "✅ Category created successfully!",
      category: newCategory,
    });
  } catch (error) {
    console.error("❌ Error creating category:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};

/**
 * ✅ Get all categories (Public)
 */
export const getAllCategoriesController = async (req, res) => {
  try {
    // Fetch all categories
    const categories = await CategoryModel.find();

    // Add sequential numbering (1-based index)
    const numberedCategories = categories.map((category, index) => ({
      no: index + 1, // Sequential numbering
      ...category.toObject(), // Convert Mongoose document to plain object
    }));

    // Return structured response
    res.status(200).json({
      message: "✅ Categories retrieved successfully!",
      categories: numberedCategories,
    });
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    res
      .status(500)
      .json({ message: "❌ Internal server error", error: error.message });
  }
};

/**
 * ✅ Get a single category by ID (Public)
 */
export const getCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);

    if (!category) {
      return res.status(404).json({ message: "❌ Category not found." });
    }

    res.status(200).json({
      message: "✅ Category retrieved successfully!",
      category,
    });
  } catch (error) {
    console.error("❌ Error fetching category:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};

/**
 * ✅ Update a category by ID (Admin only)
 */
export const updateCategoryController = async (req, res) => {
  try {
    const { role } = req.user; // Extract role from authentication middleware
    const { id } = req.params;
    const { name, image } = req.body;

    if (role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "❌ Access denied. Admins only." });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      id,
      { name, image },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "❌ Category not found." });
    }

    res.status(200).json({
      message: "✅ Category updated successfully!",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("❌ Error updating category:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};

/**
 * ✅ Delete a category by ID (Admin only)
 */
export const deleteCategoryController = async (req, res) => {
  try {
    const { role } = req.user; // Extract role from authentication middleware
    const { id } = req.params;

    if (role !== "ADMIN") {
      return res
        .status(403)
        .json({ message: "❌ Access denied. Admins only." });
    }

    const deletedCategory = await CategoryModel.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "❌ Category not found." });
    }

    res.status(200).json({
      message: "✅ Category deleted successfully!",
      category: deletedCategory,
    });
  } catch (error) {
    console.error("❌ Error deleting category:", error);
    res.status(500).json({ message: "❌ Internal server error" });
  }
};

export async function uploadCategoryImage(req, res) {
  try {
    const file = req.file;
    const { categoryId } = req.body;

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

    let updatedCategory;

    if (categoryId) {
      updatedCategory = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { image: uploadImage.url },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({
          message: "Category not found.",
          error: true,
          success: false,
        });
      }
    }

    return res.json({
      message: "Image uploaded successfully.",
      data: updatedCategory || { image: uploadImage.url }, // fallback if no category update
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

