import React, { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Signup() {
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const formValidation = () => {
    const errors = {};
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = formValidation();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords does not match");
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const response = await axios.post(
          "/api/users/createUser",
          formData,
          config
        );

        if (response.status === 201) {
          const { token } = response.data;
          storeToken(token);
          localStorage.setItem("token", token);
          toast.success("Signup successful. Please check your email for OTP.");
          navigate("/otpinput");
        } else {
          toast.error("Signup failed");
          // setErrorMessage("Some went wrong, try again");
          // setErrorMessage("");
        }
        setError("");
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        if (error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong, try again");
        }
        console.log(error.response.data.extraDetails);
      }
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[500px] p-8 shadow-md"
      >
        {/* {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )} */}

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username:
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInput}
            className={`border ${
              error.username ? "border-red-500" : "border-gray-300"
            } px-4 py-1 w-[100%] focus:outline-none focus:border-black`}
          />
          <div className="text-red-500 my-2"> {error.username} </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            className={`border ${
              error.email ? "border-red-500" : "border-gray-300"
            } px-4 py-1 w-[100%] focus:outline-none focus:border-black`}
          />
          <div className="text-red-500 my-2"> {error.email} </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInput}
            className={`border ${
              error.password ? "border-red-500" : "border-gray-300"
            } px-4 py-1 w-full focus:outline-none focus:border-black`}
          />
          <div className="text-red-500 my-2"> {error.password} </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInput}
            className={`border ${
              error.confirmPassword ? "border-red-500" : "border-gray-300"
            } px-4 py-1 w-[100%] focus:outline-none focus:border-black`}
          />
          <div className="text-red-500 my-2"> {error.confirmPassword} </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-8 my-3 rounded-full hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
        >
          Submit
        </button>

        <div className="pt-4 text-center">
          <div className="font-semibold">
            Already User?{" "}
            <NavLink to="/login" className="text-gray-400">
              Login here
            </NavLink>
          </div>
        </div>

        {/* {successMessage && <Navigate to="/otpinput" replace />} */}
      </form>
    </div>
  );
}

export default Signup;
