const { createLogger, transports, format } = require("winston");
require("winston-daily-rotate-file");

const fs = require("fs");
const path = require("path");
const {
  log: {
    location,
    appLogLevel,
    errorLogLevel,
    appLogFileName,
    errorLogFileName,
    label,
  },
} = require("../config");

if (!fs.existsSync(location)) {
  fs.mkdirSync(location);
}

// const logFileName = path.join(location, fileName);
// const errorFileName = path.join(location, errorLogFileName);

const customFormat = format.combine(
  format.label({ label }),
  // format.colorize(), disabled because of unwanted characters in file
  format.timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  format.printf(
    (info) => `${info.label}:[${info.level}][${info.timestamp}]:${info.message}`
  )
);

const consoleTransport = new transports.Console({
  format: customFormat,
});

const appLogTransport = new transports.DailyRotateFile({
  filename: `${location}/appLog/%DATE%-${appLogFileName}`,
  format: customFormat,
});
const errorLogTransport = new transports.DailyRotateFile({
  filename: `${location}/errorLog/%DATE%-${errorLogFileName}`,
  level: errorLogLevel,
  format: customFormat,
});

const winstonLogger = createLogger({
  level: appLogLevel,
  format: customFormat,
  transports: [consoleTransport, appLogTransport, errorLogTransport],
});
const getUniqueIdentifierFormat = (uniqueIdentifier) =>
  uniqueIdentifier ? `\n[${uniqueIdentifier}]: ` : "";
module.exports = (source) => {
  const logger = {
    error(text, uniqueIdentifier) {
      winstonLogger.error(
        `[${source}]:${getUniqueIdentifierFormat(uniqueIdentifier)}${text}`
      );
    },
    warn(text, uniqueIdentifier) {
      winstonLogger.warn(
        `[${source}]:${getUniqueIdentifierFormat(uniqueIdentifier)}${text}`
      );
    },
    info(text, uniqueIdentifier) {
      winstonLogger.info(
        `[${source}]:${getUniqueIdentifierFormat(uniqueIdentifier)}${text}`
      );
    },
    debug(text, uniqueIdentifier) {
      winstonLogger.debug(
        `[${source}]:${getUniqueIdentifierFormat(uniqueIdentifier)}${text}`
      );
    },
  };
  return logger;
};
