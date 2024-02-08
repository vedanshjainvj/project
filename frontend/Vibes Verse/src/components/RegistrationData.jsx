import React, { useState, useEffect } from "react";
import axios from "../Services/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const RegistrationData = () => {
  const token = localStorage.getItem("token");
  const [users, setUsers] = useState([]);
  console.log(users)  
  console.log(token)

  useEffect(() => {
    axios.get("user-data")
      .then((response) => setUsers(response.data.reverse()))
      // .then((response) => console.log(response))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`user-data/${userId}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.message);

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      alert("User deleted from database");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-full max-w-screen-md">
            <p>Total registrations = {users.length}</p>
            <table className="w-full text-md bg-white shadow-md rounded mb-4">
              <thead className="bg-gray-100 border">
                <tr>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="border-b hover:bg-orange-100 bg-gray-100"
                  >
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={user.name}
                        className="bg-transparent"
                      />
                    </td>
                    <td className="p-3 px-5">
                      <input
                        type="text"
                        value={user.email}
                        className="bg-transparent"
                      />
                    </td>
                    <td className="p-3 px-5">
                      <select value={user.role} className="bg-transparent">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="p-3 px-5 flex justify-end">
                      <button
                        type="button"
                        className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationData;
