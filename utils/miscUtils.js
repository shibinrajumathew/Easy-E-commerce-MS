const constants = require("./constants");
const AppError = require("../errors/AppError");
/**
 * Retrieve error message from constants.ErrorMessages by code
 * @param  {string} errorCode
 */
exports.getErrorMessage = (errorCode) => {
  console.log("errorCode", errorCode);
  const { ErrorMessages } = constants;
  const message = ErrorMessages[errorCode];
  if (!message) {
    throw new AppError();
  }
  return message;
};
