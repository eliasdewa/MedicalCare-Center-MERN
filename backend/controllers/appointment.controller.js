import asyncHandler from 'express-async-handler';
import errorHandler from "../middlewares/errorHandler.js";
import Appointment  from "../models/appointment.model.js";
import User from "../models/user.model.js";

// send an appointment
export const sendAppointment = asyncHandler(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor_firstName,
    doctor_lastName,
    hasVisited,
    address,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !dob ||
    !gender ||
    !appointment_date ||
    !department ||
    !doctor_firstName ||
    !doctor_lastName ||
    !address
  ) {
    return next(errorHandler("All fields are required!", 400));
  }
  const isConflict = await User.find({
    firstName: doctor_firstName,
    lastName: doctor_lastName,
    role: "Doctor",
    doctorDepartment: department,
  });
  if (isConflict.length === 0) {
    return next(errorHandler("Doctor not found", 404));
  }

  if (isConflict.length > 1) {
    return next(
      errorHandler("Doctors Conflict! Please Contact Through Email Or Phone!", 400)
    );
  }
  const doctorId = isConflict[0]._id;
  const patientId = req.user._id;
  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    phone,
    dob,
    gender,
    appointment_date,
    department,
    doctor: {
      firstName: doctor_firstName,
      lastName: doctor_lastName,
    },
    hasVisited,
    address,
    doctorId,
    patientId,
  });
  res.status(200).json({message: "Thank you, your appointment send to the selected doctor successfully!"});
});

// get all appointments
export const getAllAppointments = asyncHandler(async (req, res, next) => {
  const allAppointments = await Appointment.find();
  res.status(200).json({allAppointments});
});

// update the appointment
export const updateAppointmentStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(errorHandler("Appointment not found!", 404));
  }
  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({message: "Appointment status has been updated successfully!"});
});

// delete the appointment
export const deleteAppointment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(errorHandler("Appointment not found!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json("Appointment status has been deleted successfully!");
});
