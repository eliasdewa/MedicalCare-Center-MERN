import mongoose from "mongoose";
import validator from "validator";

const messageSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email!"],
  },
  message: {
    type: String,
    required: true,
  },
}, {
  timestamps : true,
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
