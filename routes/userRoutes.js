import express from "express";
import validateToken from "../middleware/validateToken.js";
const router = express.Router()
import { registerUser ,loginUser , currentUser } from "../controllers/userController.js";
router.post("/register" ,registerUser)
router.post("/login" ,loginUser)


router.get("/current", validateToken , currentUser)

export default router