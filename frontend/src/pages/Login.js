import React, { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const { storeToken } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  // const [successMessage, setSuccessMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  const formValidation = () => {
    const errors = {};

    if (!formData.email) {
      toast.error("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      toast.error("Password is required");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});

    const validationErrors = formValidation();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const response = await axios.post("/api/users/login", formData, config);

        console.log(response.data);

        if (response.status === 201) {
          const { token } = response.data;
          storeToken(token);
          localStorage.setItem("token", token);
          toast.success("Login successful, Please check email for OTP");
          navigate("/otplogin");
        } else {
          toast.error("Login failed");
        }
        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        if (error.response.data) {
          toast.error(error.response.data.message);
        } else {
          console.error("Login failed:", error.message);
          toast.error("Something went wrong, please try again.");
        }
        console.log(error.response.data.message);
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
            } px-4 py-1 w-[100%]  focus:outline-none focus:border-black`}
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
            } px-4 py-1 w-[100%]   focus:outline-none focus:border-black`}
          />
          <div className="text-red-500 my-2"> {error.password} </div>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 px-8 my-3 rounded-full hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
        >
          Submit
        </button>

        <div className="pt-10 text-center">
          <div className="font-semibold">
            New User?{" "}
            <NavLink to="/signup" className="text-gray-400">
              SignUp here
            </NavLink>
          </div>
        </div>

        {/* {successMessage && <Navigate to="/otplogin" replace />} */}
      </form>
    </div>
  );
}

export default Login;
