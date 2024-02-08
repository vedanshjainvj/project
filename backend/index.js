import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import users from './models/signupuser.js';
import stipendModel from './models/stipenddata.js';
import authRoutes from './routes/authRoutes.js'
import internsModel from './models/internsregister.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose.connect('mongodb://localhost:27017/vibes-verse', {
})
.then(() => {
    console.log('Connected to vibes-verse database');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.get('/interns-registered', async (req, res) => {
  try {
    const interns = await internsModel.find(); // Retrieve all interns from the database
    res.status(200).json(interns); // Send the interns data as a JSON response
  } catch (error) {
    console.error('Error fetching interns data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/interns-data", async (req, res) => {
  try {
    // Extract intern data from request body
    const { name, phone, college, email, degree, year, source, refercode, password } = req.body;

    // Create a new Intern document using the Mongoose model
    const newIntern = new internsModel({
      name,
      phone,
      college,
      email,
      degree,
      year,
      source,
      refercode,
      password
    });

    // Save the new intern document to the database
    await newIntern.save();

    // Respond with a success message
    res.status(201).json({ message: "Intern data saved successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error saving intern data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get single user

app.get("/:id", async  (req,res) => {
  const {id} = req.params;
  try {
      const singleUser = await internsModel.findById({_id: id});
      res.status(200).json(singleUser);
  } catch (error) {
      console.log(error);
      res.status(500).json({error : error.message});
  }

})



app.patch("/interns-registered/:id", async (req, res) => {
  const internId = req.params.id;
  const updatedData = req.body; // Data to update

  try {
    // Find the intern by ID and update their data
    const updatedIntern = await internsModel.findByIdAndUpdate(internId, updatedData, { new: true });

    // Check if the intern with the provided ID exists
    if (!updatedIntern) {
      return res.status(404).json({ message: "Intern not found" });
    }

    // Return a success message along with the updated intern data
    res.status(200).json({ message: "Intern data updated successfully", updatedIntern });
  } catch (error) {
    console.error("Error updating intern data:", error);
    res.status(500).json({ error: error.message });
  }
});


app.get("/user-data", async  (req,res) => {
    try {
        const showAll = await users.find();
        console.log(showAll);
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({error : error.message});
    }
 
})
app.get("/stipend-data", async  (req,res) => {
  try {
      const showAll = await stipendModel.find();
      res.status(200).json(showAll);
  } catch (error) {
      console.log(error);
      res.status(500).json({error : error.message});
  }

})

app.post("/verify-user", async (req, res) => {
  const { verificationId } = req.body;

  try {
      const existingUser = await internsModel.findOne({ verificationId });

      if (existingUser) {
          res.status(200).json({ status: 200, message: `Yes, ${existingUser.name} exists in the database with email ${existingUser.email}!` });
      } else {
          res.status(404).json({ status: 404, message: "User not found in the database." });
      }
  } catch (error) {
      console.error('Error verifying user:', error);
      res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

app.delete('/user-data/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const deletedUser = await users.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Route to delete stipend data by ID
app.delete("/stipend-data/:stipendId", async (req, res) => {
  const stipendId = req.params.stipendId;

  try {
    const deletedStipend = await stipendModel.findByIdAndDelete(stipendId);

    if (!deletedStipend) {
      return res.status(404).json({ message: "Stipend not found" });
    }

    res.status(200).json({ message: "Stipend deleted successfully" });
  } catch (error) {
    console.error("Error deleting stipend:", error);
    res.status(500).json({ error: error.message });
  }
});
  
app.get("/" , (req,res) => {
    res.send("This is homepage of backend server !!")
})

  // Start server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port 3000`);
  });
