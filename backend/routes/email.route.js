import express from "express";
import { createEmail, getUserEmails } from "../controllers/EmailController.js";
import { verifyAccessToken } from "../middleware/auth0.js"; // Auth middleware

const EmailRouter = express.Router();

// Create email and link to user
EmailRouter.post("/create", verifyAccessToken, createEmail);

// Get user's stored emails
EmailRouter.get("/my-emails", verifyAccessToken, getUserEmails);

export default EmailRouter;
