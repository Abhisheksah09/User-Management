import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  verifyOTP,
  verifyOTPLogin,
} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validateMiddleware.js";
import { loginSchema, signupSchema } from "../validators/authValidators.js";

const router = express.Router();

router.route("/createUser").post(validate(signupSchema), createUser);
// .get(authenticate, authorizeAdmin, getAllUsers);  // Admin

router.post("/login", validate(loginSchema), loginUser);
router.post("/logout", logoutUser);

router
  .route("/profile")
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);

router.route("/verifyOTP").post(authenticate, verifyOTP);
router.route("/verifyOTPlogin").post(authenticate, verifyOTPLogin);

// router
//   .route("/createResetSession")
//   .get(authenticate, localVariables, createResetSession);
// router.route("/resetPassword").put(authenticate, localVariables, resetPassword);

// router.route("/registerMail").post(registerMail);

// Admin Routes

// router
//   .route("/:id")
//   .delete(authenticate, authorizeAdmin, deleteUserById)
//   .get(authenticate, authorizeAdmin, getUserById)
//   .put(authenticate, authorizeAdmin, updateUserById);

export default router;
