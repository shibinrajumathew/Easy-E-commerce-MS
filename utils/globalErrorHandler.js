const THUMsError = require("../errors/THUMsError");
const constants = require("../utils/constants");
const miscUtils = require("../utils/miscUtils");

/**
 * @description global error handler
 */
const handleError = (err, req, res, next) => {
  const { status, messages, code, stack } = err;
  console.error("handleError()- some errors");
  let errors = {
    code: code || "",
    message: messages || "",
  };
  const success = false;
  if (err instanceof THUMsError) {
    const message = messages || miscUtils.getErrorMessage(code);
    console.log("code, message", code, message);
    errors = { code, message };
  }

  res.status(status || 500);
  res.json({ success, errors });
};

/**
 * Fallback error handler
 */
const handleAppError = (err, req, res, next) => {
  console.error("handleAppError()- some errors", err);
  const { ErrorCodes } = constants;
  const code = ErrorCodes.SYSTEM_ERROR;
  const message = miscUtils.getErrorMessage(code);
  const errors = [
    {
      code,
      message,
    },
  ];
  res.status(500);
  res.json({ success: false, errors });
};
module.exports = [handleError, handleAppError];
