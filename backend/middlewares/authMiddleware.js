import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { asyncHandler } from "./asyncHandler.js";

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
      //   next(`Not authorized, token failed -${error}`);
    }
  } else {
    res.status(401);
    throw new Error("No token found");
  }
});

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin.");
    // next(error("Not authorized as an admin."));
    // next(`Not authorized as an admin. :${error}`);
  }
});

const localVariables = asyncHandler(async (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
});

export { authenticate, authorizeAdmin, localVariables };
