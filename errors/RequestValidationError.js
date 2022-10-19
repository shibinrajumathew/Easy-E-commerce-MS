const logger = require("../utils/logger")(__filename);
const AppError = require("./AppError");

class RequestValidationError extends AppError {
  constructor(code, messages, status) {
    super(code || "INVALID_PARAM", messages || "", status || 400);
    this.name = this.constructor.name;
    this.messages = messages || [];
  }
}

module.exports = RequestValidationError;
