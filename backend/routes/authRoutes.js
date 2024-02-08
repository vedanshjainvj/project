import express from "express"
import authControllers from "../controllers/authController.js";
import checkIsUserAuthenticated from '../middlewares/authMiddleware.js'
import stipendModel from "../models/stipenddata.js";
import internsModel from '../models/internsregister.js';

import authModel from "../models/signupuser.js";
const router = express.Router();

router.post("/users/register", authControllers.userRegistration);
router.post("/users/login", authControllers.userLogin);


// Protected routes
router.post("/change-password", checkIsUserAuthenticated, authControllers.changePassword);

router.post("/stipend", async (req, res) => {
    const { name, phone, amount } = req.body;
  
    try {
      // Create a new stipend document
      if(name && phone && amount) {
    
        // Create a new stipend document with createdAt set separately
        const newStipend = new stipendModel({
          name,
          phone,
          amount,
        });
    
      
          // Save the stipend data to the database
          const savedStipend = await newStipend.save();
      
          // Respond with a success message and the saved stipend data
          res.status(201).json({ message: "Stipend data saved successfully", stipend: savedStipend });
      } else {
        res.status(400).json({ message: "All fields are required" });
      }
      
    } catch (error) {
      // Handle errors and respond with an error message
      res.status(400).json({ message: "Internal server error", error: error.message });
    }
  });

//   router.post("/verify-user", async (req, res) => {
//     const { name } = req.body;

//     try {
//         const existingUser = await authModel.findOne({ name });

//         if (existingUser) {
//             res.status(200).json({ message: `Yes, ${existingUser.name} exists in the database with email ${existingUser.email}!` });
//         } else {
//             res.status(404).json({ message: "User not found in the database." });
//         }
//     } catch (error) {
//         console.error('Error verifying user:', error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });

router.get("/interns-registered/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the intern by ID in your database
    const singleIntern = await internsModel.findById(id);

    // Check if the intern with the provided ID exists
    if (!singleIntern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    // Return the found intern as a JSON response
    res.status(200).json(singleIntern);
  } catch (error) {
    console.error("Error fetching single intern data:", error);
    res.status(500).json({ error: error.message });
  }
});

  



export default router