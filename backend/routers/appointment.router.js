import express from "express";
import {
  sendAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment,
} from "../controllers/appointment.controller.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/send", isPatientAuthenticated, sendAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);

export default router;
