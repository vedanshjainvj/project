import mongoose from "mongoose"

const internsSchema = new mongoose.Schema({
  verificationId: 
  { 
    type: String
  },
  phone: 
  { 
    type: Number
  },
  collage: 
  { 
    type: String
  },
  name: 
  { 
    type: String
  },
  email: 
  { 
    type: String
  },
  degree: 
  { 
    type: String
  },
  year: 
  { 
    type: Number
  },
  source: 
  { 
    type: String
  },
  refercode: 
  { 
    type: String
  },
  password: 
  { 
    type: String
  }
});

const internsModel = mongoose.model('interns', internsSchema);
export default internsModel