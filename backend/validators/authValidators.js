import { z } from "zod";

const signupSchema = z.object({
  username: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters " })
    .max(255, { message: "Name is too long" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters " })
    .max(255, { message: "Email is too long" }),

  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(7, { message: "password must be at least of 6 characters " })
    .max(1024, { message: "password is too long" }),

  //   isAdmin: z
  //     .boolean({ required_error: "Admin is not Authorized" })
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address or password" })
    .min(3, { message: "Email must be at least of 3 characters " })
    .max(255, { message: "Email is too long" }),

  password: z
    .string({ required_error: "password is required" })
    .trim()
    .min(7, { message: "password must be at least of 6 characters " })
    .max(1024, { message: "password is too long" }),
});

export { signupSchema, loginSchema };
