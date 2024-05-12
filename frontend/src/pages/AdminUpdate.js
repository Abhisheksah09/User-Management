import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AdminUpdate = () => {
  const { authorizationToken } = useAuth();
  const params = useParams();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const [error, setError] = useState("");

  const getSingleUserData = async () => {
    try {
      const response = await axios.get(`/api/admin/users/${params.id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        setFormData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleUserData();
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/api/admin/users/${params.id}`,
        formData,
        {
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      if (response.status === 200) {
        setFormData(response.data);
        toast.success("Updated Successful");
      } else {
        toast.error("User data not updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-[500px] p-8 shadow-md"
      >
        <div>
          <h1 className="block text-gray-700 text-xl font-bold mb-8 ">
            Update User Data
          </h1>
        </div>
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

        <button
          type="submit"
          className="bg-black text-white py-2 px-8 my-3 rounded-full hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default AdminUpdate;
