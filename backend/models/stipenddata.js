import mongoose from "mongoose";

const stipendSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
  },
  amount: {
    type: Number,
  },
  createdAt: {
    date: {
      type: Date,
      default: Date.now,
    },
    time: {
        type: Date,
        default: Date.now,
      },

  },
});
const stipendModel = mongoose.model('stipend', stipendSchema);
export default stipendModel;