import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
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
    validate: [validator.isEmail, "Provide A Valid Email!"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  phone: {
    type: String,
    required: [true, "Phone Is Required!"],
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female"],
  },
  role: {
    type: String,
    required: true,
    enum: ["Patient", "Doctor", "Admin"],
  },
  adminAvatar: {
    public_id: String,
    url: String,
  },
  doctorDepartment:{
    type: String,
  },
  doctorAvatar: {
    public_id: String,
    url: String,
  },
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);
export default User;
