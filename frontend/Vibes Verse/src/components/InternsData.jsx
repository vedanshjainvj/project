import React, { useState, useEffect } from "react";
import axios from "../Services/axiosInterceptor";
import {Link} from "react-router-dom";

const InternsData = () => {
    const [interns, setInterns] = useState([]);

  useEffect(() => {
    // Fetch data from your backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('/interns-registered'); // Adjust the endpoint as per your backend setup
        setInterns(response.data); // Assuming the response data is an array of interns
      } catch (error) {
        console.error('Error fetching interns data:', error);
      }
    };

    fetchData();
  }, []);
    const handleUpdate = (internId) => {
        // Redirect to the updateintern component with the intern ID as a route parameter
        
      };
    
      const handleDelete = (internId) => {
        // Handle delete functionality here
      };
  return (
    <>
    <h2 className="text-2xl font-bold mb-4">Registered Interns</h2>
      <table className="border-collapse border border-gray-600 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-600 p-2">Name</th>
            <th className="border border-gray-600 p-2">Email</th>
            <th className="border border-gray-600 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {interns.map((intern) => (
            <tr key={intern._id}>
              <td className="border border-gray-600 p-2">{intern.name}</td>
              <td className="border border-gray-600 p-2">{intern.email}</td>
              <td className="border border-gray-600 p-2">
              <Link to={`/UpdateIntern/${intern._id}`} className="bg-blue-500 text-white px-4 py-2 mr-2 rounded hover:bg-blue-600">

                  Update
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(intern._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default InternsData