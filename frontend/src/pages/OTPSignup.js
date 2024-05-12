import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const OTPSignup = () => {
  const { storeToken } = useAuth();
  const navigate = useNavigate();

  const [otp, setOTP] = useState(Array(6).fill(""));
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRefs = useRef([]);

  const focusNextInput = (index) => {
    if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOTPChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value.slice(0, 1);
      setOTP(newOTP);
      if (value && index < 5) {
        focusNextInput(index);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    storeToken(token);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `/api/users/verifyOTP`,
        { otp: otp.join("") },
        config
      );

      if (response.status === 200) {
        setOTP(Array(6).fill(""));
        navigate("/");
      }

      toast.success("OTP is Valid, signup successful");
    } catch (error) {
      toast.error("OTP is Invalid, signup failed");
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {successMessage && (
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
      )}
      <p className="text-[30px] mb-4">Enter OTP</p>
      <div className="bg-white p-8 m-2 shadow-md rounded-md flex">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleOTPChange(index, e.target.value)}
            maxLength={1}
            ref={(el) => (inputRefs.current[index] = el)}
            className="w-12 h-12 text-3xl m-5 border border-gray-300 rounded-md text-center mx-4 focus:outline-none focus:border-blue-500"
          />
        ))}
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-black text-white py-2 px-8 mt-4 rounded-full hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
      >
        Submit
      </button>

      {successMessage && <Navigate to="/" replace />}
    </div>
  );
};

export default OTPSignup;
