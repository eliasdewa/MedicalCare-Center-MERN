import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.log("Error while connecting to database:", err);
    });
};
