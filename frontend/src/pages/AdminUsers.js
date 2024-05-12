import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await axios.get("/api/admin/users/getalluser", {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        setUsers(response.data); // Set users directly from response data
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/admin/users/${id}`, {
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <table className="w-[80%] m-auto my-[5rem] divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Username
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Update
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Delete
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((currUser, index) => {
            return (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{currUser._id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {currUser.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {currUser.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-indigo-600 hover:text-indigo-900">
                    <Link to={`/admin/users/${currUser._id}/edit`}>Edit</Link>
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDelete(currUser._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AdminUsers;
