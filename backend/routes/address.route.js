import express from "express";
import { verifyAccessToken } from "../middleware/auth0.js";
import { createAddressController, deleteAddressController, getAddressByIdController, getUserAddressesController, updateAddressController } from "../controllers/AddressController.js";

const AddressRouter = express.Router();

// Routes with authentication
AddressRouter.post("/address", verifyAccessToken, createAddressController);
AddressRouter.get("/addresses", verifyAccessToken, getUserAddressesController);
AddressRouter.get("/address/:id", verifyAccessToken, getAddressByIdController);
AddressRouter.put("/address/:id", verifyAccessToken, updateAddressController);
AddressRouter.delete("/address/:id", verifyAccessToken, deleteAddressController);

export default AddressRouter;
