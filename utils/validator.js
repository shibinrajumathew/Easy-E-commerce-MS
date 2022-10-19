const validator = require("express-validator");
const constants = require("../utils/constants");
const RequestValidationError = require("../errors/RequestValidationError");
const logger = require("../utils/logger")(__filename);

const { check, validationResult, query } = validator;
const { ErrorCodes, ErrorMessages } = constants;

const errorFormatter = ({ location, msg, param }) => {
  const errorCode = ErrorCodes.REQUEST_PARAMS_MISSING;
  const message = ErrorMessages[errorCode];
  const formattedMessage = `${location}[${param}]`;
  return formattedMessage;
};

const handleResult = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    const message = "Param(s) missing:" + errors.array();
    throw new RequestValidationError(
      ErrorCodes.REQUEST_PARAMS_MISSING,
      message
    );
  }
  next();
};

const resultHandler = (validationChains) => [validationChains, handleResult];

module.exports = { check, resultHandler, query };
