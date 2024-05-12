import React, { useState } from "react";
import { CiCircleRemove } from "react-icons/ci";
import { useAuth } from "../store/auth";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
  });

  const { authorizationToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Load user details and profile image from browser storage
    const storedUserDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (storedUserDetails) {
      setUserDetails(storedUserDetails);
    }
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setSelectedImage(storedImage);
    }
  }, []);

  const userDetailsProfile = async () => {
    try {
      const config = {
        headers: {
          Authorization: authorizationToken,
        },
      };
      const response = await axios.get("/api/users/profile", config);

      if (response.status === 200) {
        setUserDetails(response.data);
      }
    } catch (error) {
      console.log("Error from fetching data");
    }
  };

  useEffect(() => {
    userDetailsProfile();
  }, []);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    localStorage.setItem("selectedImage", URL.createObjectURL(file));
  };

  const removeImage = () => {
    setSelectedImage(null);
    localStorage.removeItem("selectedImage");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`/profileEdit`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-80 bg-white p-8 shadow-md rounded-md flex flex-col items-center relative">
        {/* Profile Image */}
        <div
          className="relative mb-4 w-36 h-36"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {selectedImage ? (
            <>
              <img
                src={selectedImage}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
              {isHovered && (
                <button
                  onClick={removeImage}
                  className="absolute bottom-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <CiCircleRemove />
                </button>
              )}
            </>
          ) : (
            <>
              <div className="w-full h-full flex justify-center items-center bg-gray-200 rounded-full">
                <span className="text-gray-400">Upload</span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </>
          )}
        </div>

        {/* User Name */}
        <input
          type="text"
          name="username"
          value={userDetails.username}
          onChange={handleInputChange}
          className="border-b mb-4 px-2 py-1 focus:outline-none focus:border-blue-500 text-center"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          className="border-b mb-4 px-4 py-2 w-full  focus:outline-none focus:border-blue-500 text-center"
        />

        {/* Edit Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={handleEditClick}
        >
          {/* <Link to={`/profileEdit${userDetails._id}/edit`}>Edit </Link> */}
          <Link to="/profileEdit">Edit</Link>
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Profile;
