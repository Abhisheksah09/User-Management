import { asyncHandler } from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import otpGenerator from "otp-generator";
import { Verify } from "crypto";
import { error } from "console";
import { emailOTP } from "./mailer.js";
import validator from "validator";
import { signupSchema } from "../validators/authValidators.js";

const createUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(req.body);

  const { username } = req.method == "GET" ? req.query : req.body;

  if (!username || !email || !password) {
    throw new Error("Please fill the all input");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const validationErrors = signupSchema.safeParse({
    username,
    email,
    password,
  });

  if (!validationErrors.success) {
    const errorMessages = validationErrors.error.errors.map(
      (error) => error.message
    );
    return res.status(400).json({ errors: errorMessages });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) return res.status(404).send("User already exists");

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = otpGenerator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    req.session.otp = otp;
    req.session.username = username;
    req.session.email = email;
    req.session.password = password;

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      otp,
    });

    const mailResponse = await emailOTP(email, otp);
    console.log(mailResponse);

    return res.status(201).json({
      status: "success",
      message: "Signup OTP has been sent successfully on email",
      token: generateToken(res, newUser._id),
      otp,
    });
  } catch (error) {
    res.status(404);
    // throw new Error("Failed to send OTP");
    next(error);
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ error: "OTP is required" });
  }

  try {
    const sessionOTP = req.session.otp;

    if (otp !== sessionOTP) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    const { username, email, password } = req.session;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      otp,
    });
    await newUser.save();

    const token = generateToken(res, newUser._id);

    return res.status(200).json({
      status: "success",
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordValid) {
      // Generate OTP
      const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });

      req.session.otp = otp;
      req.session.email = email;
      req.session.password = password;

      try {
        await emailOTP(email, otp);
        return res.status(201).json({
          status: "success",
          message: "Login OTP has been sent successfully on email",
          token: generateToken(res, existingUser._id),
          otp,
        });
      } catch (error) {
        console.error("Failed to send Login OTP:", error);
        return res.status(500).json({ error: "Failed to send OTP" });
      }
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } else {
    return res.status(400).json({ message: "Invalid email or Password" });
  }
});

const verifyOTPLogin = asyncHandler(async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    return res.status(400).json({ error: "OTP is required" });
  }

  try {
    const sessionOTP = req.session.otp;

    const { email, password } = req.session;

    if (!sessionOTP || !email || !password) {
      return res.status(401).json({ error: "Session data missing" });
    }

    if (otp !== sessionOTP) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    const existingUserLogin = await User.findOne({
      email,
    });

    if (existingUserLogin) {
      const isPasswordValid = await bcrypt.compare(
        password,
        existingUserLogin.password
      );

      if (!existingUserLogin) {
        return res
          .status(401)
          .json({ error: "User not found or credentials invalid" });
      }

      if (isPasswordValid) {
        res.status(200).json({
          status: "success",
          message: "User login successfully",
          status: "success",
          _id: existingUserLogin._id,
          username: existingUserLogin.username,
          email: existingUserLogin.email,
          isAdmin: existingUserLogin.isAdmin,
          token: generateToken(res, existingUserLogin._id),
        });
      }
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   const existingUser = await User.findOne({ email });

//   if (existingUser) {
//     const isPasswordValid = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (isPasswordValid) {
//       const loginData = {
//         user: existingUser._id,
//         loginTime: new Date(),
//       };
//       // await LoginHistory.create(loginData);

//       res.status(201).json({
//         status: "success",
//         _id: existingUser._id,
//         username: existingUser.username,
//         email: existingUser.email,
//         isAdmin: existingUser.isAdmin,
//         token: generateToken(res, existingUser._id),
//       });
//       return;
//     } else {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }
//   } else {
//     return res.status(400).json({ message: "Invalid email or Password" });
//   }
// });

const logoutUser = asyncHandler(async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    res.status(404);
    throw new Error("Something Went Wrong try again after some time");
  }
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found...");
  }
});

const updateCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    return res.status(201).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      // isAdmin: updatedUser.isAdmin,
      // token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Admin

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password");

    if (!users) {
      res.status(404);
      throw new error("User is not admin");
    }

    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(404);
    throw new Error("User not found...");
    // next(error);
  }
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(404);
      throw new Error("Admin cannot be deleted");
    }

    await User.deleteOne({ _id: user._id });
    return res.status(200).json({ message: "User remove sucessfully" });
  } else {
    res.status(404);
    throw new Error("User not found ");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    return res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updateUserById = await user.save();

    return res.status(200).json({
      _id: updateUserById._id,
      username: updateUserById.username,
      email: updateUserById.email,
      isAdmin: updateUserById.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  verifyOTP,
  verifyOTPLogin,
};

/*  res:- HTTP response that the server sends back to the client. 
 It is used to send data back to the client, 
 such as HTML, JSON, status codes, and cookies. 

 That mean res is only used in when we are sending json , status codes,
  and cookies. 

  req :-  the HTTP request that the client (e.g., browser, Postman) 
  sends to the server. It contains information about the request
   such as parameters, headers, and often user authentication details.

 */
