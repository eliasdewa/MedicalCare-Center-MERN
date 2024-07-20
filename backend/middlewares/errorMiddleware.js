import { constant } from "./constant.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  switch (statusCode) {
    case constant.VALIDATION_ERROR:
      res.status(statusCode).json({success: "false", statusCode, error: "Validation Failed", message: err.message});
      break;
    case constant.UNAUTHORIZED:
      res.status(statusCode).json({success: "false", statusCode, error: "Unauthorized", message: err.message});
      break;
    case constant.FORBIDDEN:
      res.status(statusCode).json({success: "false", statusCode, error: "Forbidden", message: err.message});
      break;
    case constant.NOT_FOUND:
      res.status(statusCode).json({success: "false", statusCode, error: "Not Found", message: err.message});
      break;
    case constant.SERVER_ERROR:
      res.status(statusCode).json({success: "false", statusCode, error: "Server Error", message: err.message});
      break;
    default:
      console.log("No Error, All good!");
      break;
  }
  // res.status(statusCode).json({
  //   success: false,
  //   statusCode,
  //   message,
  // });
}

export default errorMiddleware;