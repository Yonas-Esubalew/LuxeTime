import express from "express"
import { createProductController, deleteProductController, getAllProductsController, getProductByIdController, updateProductController, uploadProductImage } from "../controllers/ProductController.js";
import { verifyAccessToken } from "../middleware/auth0.js";
import upload from "../middleware/multer.js";

const ProductRouter = express.Router()

ProductRouter.post("/product", verifyAccessToken,    createProductController);  // Create a new product
ProductRouter.get("/product/:id", verifyAccessToken,    getProductByIdController);  // Get a product by ID
ProductRouter.put("/product/:id", verifyAccessToken,    updateProductController);  // Update a product by ID
ProductRouter.delete("/product/:id", verifyAccessToken,    deleteProductController);  // Delete a product by ID
ProductRouter.get("/products", verifyAccessToken,    getAllProductsController);  // Get all products for admin
ProductRouter.post("/upload",verifyAccessToken, upload.single("image") , uploadProductImage)

export default ProductRouter










 