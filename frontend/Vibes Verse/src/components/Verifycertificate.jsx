import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "../Services/axiosInterceptor";
import verifyimg from '../assets/verify3.png'

const VerifyCertificate = () => {
  const [value, setValue] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [userData, setUserData] = useState(true);

  const handleEvent = async () => {
    try {
      // Make a POST request to verify the user
      const response = await axios.post("verify-user", { verificationId: value });

      if (response.status === 200) {
        const result = response.data;
        setVerificationResult(result.message);
        setUserData(result.user); // Save user data
      } else if (response.status === 404) {
        setVerificationResult("User not found in the database.");
        setUserData(null); // Reset user data
      } else {
        console.error("Failed to verify user");
        setVerificationResult("Error verifying user");
        setUserData(null); // Reset user data
      }
    } catch (error) {
      console.error("Error verifying user:", error);
      setVerificationResult("Error verifying user");
      setUserData(null); // Reset user data
    }
  };

  return (
    <>
      <Navbar />
      <header class="bg-white dark:bg-gray-900">
    

    <div class="container px-6 py-16 mx-auto">
        <div class="items-center lg:flex">
            <div class="w-full lg:w-1/2">
                <div class="lg:max-w-lg">
                    <h1 class="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">Subscribe To The <span class="text-blue-500">Newsletter</span></h1>

                    <p class="mt-3 text-gray-600 dark:text-gray-400">be the first to knows when our <span class="font-medium text-blue-500">Brand</span> is live</p>

                    <div class="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                        <input id="email" type="text" class="px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="Email Address"/>

                        <button class="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                <img class="w-full h-full max-w-md" src={verifyimg}/>
            </div>
        </div>
    </div>
</header>
      <div>
        <h1 className="text-xl font-bold">Verify Your Certificate</h1>
      </div>
      <div className="w-full flex gap-x-10 h-screen justify-between items-center">
        <img className="w-[700px]" src={verifyimg} alt="" />
        <form>
        <input
          type="text"
          placeholder="Enter Name to be searched"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="border border-black ml-20"
        />
        <button
          className="bg-blue-600 px-2 py-1 rounded-lg"
          type="button"
          onClick={handleEvent}
        >
          Verify Here
        </button>
        {verificationResult && <p>{verificationResult}</p>}

      </form>
      </div>
    </>
  );
};

export default VerifyCertificate;
