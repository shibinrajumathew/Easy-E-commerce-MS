const AppError = require('./AppError');

class THUMsError extends AppError {
  constructor(code, message, status) {
    super(code || 'THU_ERROR', message || '', status || 200);
    this.name = this.constructor.name;
  }
}

module.exports = THUMsError;