import asyncHandler from 'express-async-handler';
import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import cloudinary from "cloudinary";
import errorHandler from "../middlewares/errorHandler.js";
import jwt from 'jsonwebtoken';

// Patient registration
export const patientRegister = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, phone, dob, gender, password, role } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(errorHandler("All fields are required!", 400));
  }

  if (firstName.length < 4 || firstName.length > 12) {
    return next(errorHandler("First name must be between 4 and 12 characters long", 400));
  }
  if (firstName.includes(' ')) {
    return next(errorHandler("First name can't contains spaces", 400));
  }
  if (lastName.length < 3 || lastName.length > 12) {
    return next(errorHandler("Last name must be between 3 and 12 characters long", 400));
  }
  if (lastName.includes(' ')) {
    return next(errorHandler("Last name can't contains spaces", 400));
  }
  // email address
  if (!email.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return next(errorHandler("Invalid email address", 400));
  }
  // Password
  if (password.length < 8) {
    return next(errorHandler("Password Must Contain At Least 8 Characters!", 400));
  }
  // phone number
  if (phone.length !== 10) {
    return next(errorHandler("phone number should exactly 10 characters long", 400));
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(errorHandler("User already exist!", 400));
  }

  // hashed the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password: hashedPassword,
    role: "Patient",
  });
  await newUser.save();
  // generate a token
  const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET_KEY)
  const tokenName = newUser.role === 'Admin' ? 'adminToken' : 'patientToken';
  res.status(200).cookie(tokenName, token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }).json({message: "User registered successfully"});
});

// add new admin
export const addNewAdmin = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(errorHandler("Admin avatar required!", 400));
  }
  const { adminAvatar } = req.files;
  const allowedFormats = ["image/png", "image/JPG", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(adminAvatar.mimetype)) {
    return next(errorHandler("File format not supported!", 403));
  }
  const { firstName, lastName, email, phone, dob, gender, password } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !adminAvatar
  ) {
    return next(errorHandler("All fields are required!", 400));
  }

  const adminUserExist = await User.findOne({ email });
  if (adminUserExist) {
    return next(errorHandler(`${adminUserExist.role} with this email already exist!`, 400));
  }
  // hashed the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(adminAvatar.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(errorHandler("Failed to upload admin avatar to cloudinary", 500));
  }

  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password: hashedPassword,
    adminAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    role: "Admin",
  });
  res.status(200).json({message: "New admin registered"});
});

// add a new doctor
export const addNewDoctor = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(errorHandler("Doctor avatar required!", 400));
  }
  const { doctorAvatar } = req.files;
  const allowedFormats = ["image/png", "image/JPG", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(doctorAvatar.mimetype)) {
    return next(errorHandler("File format not supported!", 403));
  }
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment ||
    !doctorAvatar
  ) {
    return next(errorHandler("All fields are required!", 400));
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(errorHandler(`${isRegistered.role} already exist with this email`, 400));
  }

  // hashed the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // cloudinary
  const cloudinaryResponse = await cloudinary.uploader.upload(doctorAvatar.tempFilePath);
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(errorHandler("Failed to upload doctor avatar to cloudinary", 500));
  }
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    password: hashedPassword,
    role: "Doctor",
    doctorDepartment,
    doctorAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({message: "New doctor registered"});
});

// login user
export const login = asyncHandler(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(errorHandler("All fields are required!", 400));
  }
  // Check email is exist or not
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(errorHandler("Invalid password or email", 404));
  }
  // Check password is the same as the confirmation password
  if (password !== confirmPassword) {
    return next(errorHandler("Password & Confirm Password Do Not Match!", 400));
  }
  // check the password is correct or not
  const validPassword = bcryptjs.compareSync(password, user.password);
  if (!validPassword) {
    return next(errorHandler("Invalid password or email", 404));
  }
  // check the role of the user is correct
  if (role !== user.role) {
    return next(errorHandler("User not found with this role!", 404));
  }
  // // To hide the password
  // const {password: pass, ...rest} = user._doc;

  // generate a token
  const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY)
  const tokenName = user.role === 'Admin' ? 'adminToken' : 'patientToken';
  res.status(200).cookie(tokenName, token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }).json({message:"Logged in successfully"});
});

// get all doctors
export const getAllDoctors = asyncHandler(async (req, res, next) => {
  const doctors = await User.find({ role: "Doctor" });
  res.status(200).json({doctors});
});

// get user information
export const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({user});
});

// get all patients
export const getAllPatients = asyncHandler(async (req, res, next) =>{
  const allPatients = await User.find({ role: "Patient" });
  res.status(200).json({allPatients});
});

// Logout function for dashboard admin
export const logoutAdmin = asyncHandler(async (req, res, next) => {
  res
    .status(201)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({message: "Admin logged out successfully."});
});

// Logout function for frontend patient
export const logoutPatient = asyncHandler(async (req, res, next) => {
  res
    .status(201)
    .cookie("patientToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({message: "Logged out successfully."});
});