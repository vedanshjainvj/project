import React, { useState, useEffect } from "react";
import axios from "../Services/axiosInterceptor";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Stipend = () => {
  const [stipend, setStipend] = useState({
    name: "",
    phone: "",
    amount: "",
  });
  const [stipendData, setStipendData] = useState([]);

  const handleStipendSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to save new stipend data
      const response = await axios.post("api/auth/stipend", stipend);
      //   alert(response.data.message);

      // Fetch updated stipend data after submission
      const updatedStipendData = await axios.get("stipend-data");
      setStipendData(updatedStipendData.data.reverse());

      // Clear the form
      setStipend({
        name: "",
        phone: "",
        amount: "",
      });
    } catch (error) {
      console.error("Error submitting stipend data:", error.message);
    }
  };
  useEffect(() => {
    const fetchStipendData = async () => {
      try {
        // Fetch stipend data after the component has mounted
        const response = await axios.get("stipend-data");
        setStipendData(response.data.reverse());
      } catch (error) {
        console.error("Error fetching stipend data:", error);
      }
    };

    fetchStipendData();
  }, []);
  const handleDeleteStipend = async (stipendId) => {
    try {
      const response = await axios.delete(`/stipend-data/${stipendId}`);

      if (response.status === 200) {
        const updatedStipendData = await axios.get("stipend-data");
        setStipendData(updatedStipendData.data.reverse());
        console.log("Stipend deleted successfully.");
      }
    } catch (error) {
      console.error("Error deleting stipend:", error.message);
    }
  };

  return (
    <>
      <div className="flex">
        <Sidebar></Sidebar>
        <div className="flex flex-col w-full text-center">
          <form onSubmit={handleStipendSubmit}>
            <input
              name="name"
              placeholder="Enter name"
              className="border-4 border-blue-400 px-2 py-2 text-lg text-center mr-10 rounded-xl"
              value={stipend.name}
              onChange={(e) => {
                setStipend({
                  ...stipend,
                  [e.target.name]: e.target.value,
                });
              }}
              type="text"
            />
            <input
              name="phone"
              className="border-4 border-green-400 px-2 py-2 text-lg text-center mr-10 rounded-xl"
              placeholder="Enter phone"
              value={stipend.phone}
              onChange={(e) => {
                setStipend({
                  ...stipend,
                  [e.target.name]: e.target.value,
                });
              }}
              type="text"
            />
            <input
              placeholder="Enter amount"
              className="border-4 border-orange-400 px-2 py-2 text-lg text-center mr-10 rounded-xl"
              name="amount"
              value={stipend.amount}
              onChange={(e) => {
                setStipend({
                  ...stipend,
                  [e.target.name]: e.target.value,
                });
              }}
              type="text"
            />
            <button className="border-4 border-gray-400 px-2 py-2 text-center mr-10 rounded-xl">
              Submit
            </button>
          </form>
          <div className="flex justify-center text-start text-gray-700 w-full">
          <div class="max-w-4xl my-10 mx-auto">
            <div class="flex flex-col">
              <div class="shadow-md sm:rounded-lg">
                <div class="inline-block min-w-full align-middle">
                  <div class="overflow-hidden ">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Name
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Phone
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Amount
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Date
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Time
                          </th>
                          <th className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Delete
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-300">
                        {/* Display stipend data using map function */}
                        {stipendData.map((stipend) => (
                          <tr
                            key={stipend._id}
                            className="hover:bg-gray-100 "
                          >
                            <td className="py-4 px-6 text-sm font-medium ">
                              {stipend.name}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium ">
                              {stipend.phone}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium ">
                              {stipend.amount}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium">
                              {new Date(
                                stipend.createdAt.date
                              ).toLocaleDateString()}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium  whitespace-nowrap">
                              {new Date(
                                stipend.createdAt.time
                              ).toLocaleTimeString()}
                            </td>
                            <td className="py-4 px-6 text-sm font-medium">
                              <button
                                onClick={() => handleDeleteStipend(stipend._id)}
                                className="text-red-500 hover:text-red-700"
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
            </div>
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Stipend;
