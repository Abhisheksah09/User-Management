import express from "express";
import {
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const adminRoutes = express.Router();

adminRoutes.route("/getalluser").get(authenticate, authorizeAdmin, getAllUsers);

adminRoutes
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteUserById)
  .get(authenticate, authorizeAdmin, getUserById)
  .put(authenticate, authorizeAdmin, updateUserById);

export default adminRoutes;
