import express from "express";
import { 
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryController,
  deleteCategoryController,
  uploadCategoryImage
} from "../controllers/CategoryController.js";
import { verifyAccessToken } from "../middleware/auth0.js";
import upload from "../middleware/multer.js";


const CategoryRouter = express.Router();

CategoryRouter.post("/", verifyAccessToken, createCategoryController); // Admin only
CategoryRouter.get("/", getAllCategoriesController); // Public
CategoryRouter.get("/:id", verifyAccessToken, getCategoryByIdController); // Public
CategoryRouter.put("/:id", verifyAccessToken, updateCategoryController); // Admin only
CategoryRouter.delete("/:id", verifyAccessToken, deleteCategoryController); 
CategoryRouter.post("/upload", verifyAccessToken, upload.single("image"), uploadCategoryImage)

export default CategoryRouter;
