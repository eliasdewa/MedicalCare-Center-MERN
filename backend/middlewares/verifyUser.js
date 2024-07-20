import asyncHandler from 'express-async-handler';
import User from "../models/user.model.js";
import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

// Middleware to authenticate dashboard users
export const isAdminAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.adminToken;
  if (!token) {
    return next(
      errorHandler("Admin is not authenticated!", 401)
    );
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  // Authorization starts here
  if (req.user.role !== "Admin") {
    return next(
      errorHandler(`${req.user.role} unauthorized for this resource!`, 403)
    );
  }
  // ends here
  next();
});

// Middleware to authenticate frontend users
export const isPatientAuthenticated = asyncHandler(async (req, res, next) => {
  const token = req.cookies.patientToken;
  if (!token) {
    return next(errorHandler("User is not authenticated!", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Patient") {
    return next(
      errorHandler(`${req.user.role} unauthorized for this resource!`, 403)
    );
  }
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        errorHandler(
          `${req.user.role} not allowed to access this resource!`
        )
      );
    }
    next();
  };
};
