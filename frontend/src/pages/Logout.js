import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Logout = () => {
  const { LogoutUser, isLoading } = useAuth(); // Destructure isLoading from useAuth
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post("/api/users/logout");
      if (response.status === 200) {
        toast.success("Logout Successful");
        LogoutUser(); // Call the LogoutUser function
      }
    } catch (error) {
      toast.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    logout();
  }, [LogoutUser]);

  // Check if isLoading is false, indicating that logout is complete
  if (!isLoading) {
    navigate("/"); // Redirect to home page
  }

  return (
    <>
      <Navigate to="/login" replace />
      <ToastContainer />
    </>
  );
};

export default Logout;
