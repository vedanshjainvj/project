import React, { useState, useEffect } from "react";
import axios from "../Services/axiosInterceptor";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import InternsRegister from "./InternsRegister";
import Hero from "./Hero";
import UpdateIntern from "./UpdateIntern";
import InternsData from "./InternsData";
const Home = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  const [input, setInput] = useState({
    newpassword: "",
    confirmpassword: "",
  });

  
  const handleChangePassword = async (e) => {
    e.preventDefault();
    const response = await axios.post("api/auth/change-password", input, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.message);
    if (response.status === 200) {
      navigate("/login");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    handleLogout();
  };
  return (
    <>
      <Navbar></Navbar>
      <InternsData></InternsData>
      <Hero></Hero>
      <InternsRegister></InternsRegister>

      {/* Welcome, {name}
      
      <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">Change Password</h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleChangePassword}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        name="newpassword"
                        value={input.newpassword}
                        onChange={(e) => {
                          setInput({
                            ...input,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Email address"
                      />
                      <label
                        htmlFor="newpassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        New Password
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        name="confirmpassword"
                        value={input.confirmpassword}
                        onChange={(e) => {
                          setInput({
                            ...input,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-rose-600"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="confirmpassword"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                      >
                        Confirm Password
                      </label>
                    </div>
                    <div className="relative">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                      >
                        Change Password
                      </button>
                      <button
                        onClick={handleLogout}
                        className="bg-blue-500 text-white rounded-md px-2 py-1"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Home;
