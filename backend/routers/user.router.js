import express from "express";
import {
  patientRegister,
  addNewAdmin,
  addNewDoctor,
  login,
  getAllDoctors,
  getUserDetails,
  logoutAdmin,
  logoutPatient,
  getAllPatients,
} from "../controllers/user.controller.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/patient/register", patientRegister);
router.get("/patient/me", isPatientAuthenticated, getUserDetails);
router.get("/patient/logout", isPatientAuthenticated, logoutPatient);
router.get("/patient/getall", isAdminAuthenticated, getAllPatients);

router.post("/admin/register", isAdminAuthenticated, addNewAdmin);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);

router.post("/doctor/register", isAdminAuthenticated, addNewDoctor);
router.post("/login", login);
router.get("/doctors", getAllDoctors);


export default router;
