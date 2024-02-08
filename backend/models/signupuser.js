import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  name: 
  { 
    type: String
  },
  email: 
  { 
    type: String
  },
  password: 
  { 
    type: String
  }
});

const authModel = mongoose.model('users', userSchema);
export default authModel