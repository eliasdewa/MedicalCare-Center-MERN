const errorHandler = (message, statusCode) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};

export default errorHandler;