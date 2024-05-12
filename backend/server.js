import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoutes.js";
import session from "express-session";
import crypto from "crypto";
import { errorMiddleware, notFound } from "./middlewares/errorMiddleware.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

connectDB();

const app = express();

const sessionSecret = crypto.randomBytes(32).toString("hex");

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api running Sucessfully...........");
});

app.use("/api/users", userRouter);
app.use("/api/admin/users", adminRoutes);

app.use(errorMiddleware);
app.use(notFound);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
