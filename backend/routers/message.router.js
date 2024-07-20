import express from "express";
import {
  getAllMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { isAdminAuthenticated } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/send", sendMessage);

router.get("/getall", isAdminAuthenticated, getAllMessages);

export default router;