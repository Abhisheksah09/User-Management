import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 1000,
  });

  return token;
};

export default generateToken;

// Example

// token has three part Header , payload, signature
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. - Header
// eyJ1c2VySWQiOiI2NjI2Yjk0OTk4NDkwYjZmMWMyNGRkZmYiLCJpYXQiOjE3MTM4MTQxMjUsImV4cCI6MTcxNDQxODkyNX0. - payload
// G0LTIjjtwb_80OyKq6IGYRA8-hTrjM_5iRObNkEi7do - signature
