import asyncHandler from 'express-async-handler';
import errorHandler from "../middlewares/errorHandler.js";
import  Message  from "../models/message.model.js";

// Send a message
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, message } = req.body;
  if (!firstName || !lastName || !email || !message) {
    return next(errorHandler("All fields are required!", 400));
  }
  if (firstName.length < 3 || firstName.length > 12) {
    return next(errorHandler("First name must be between 3 and 12 characters long", 400));
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
  // message
  if (message.length < 10) {
    return next(errorHandler("Message must have at least 10 characters long", 400));
  }

  await Message.create({ firstName, lastName, email, message });
  res.status(200).json({message: "Message has been sent successfully!"});
});

// get all messages
export const getAllMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({messages});
});
