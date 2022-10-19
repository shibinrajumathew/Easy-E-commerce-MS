/**
 * App defined error codes
 */
exports.ErrorCodes = {
  UNAUTHORIZED: "UNAUTHORIZED",
  INVALID_TOKEN: "MS_INVALID_TOKEN",
  SYSTEM_ERROR: "SYSTEM_ERROR",
  USER_NOT_EXIST: "MS_USER_NOT_EXIST",
  REQUEST_PARAMS_MISSING: "REQUEST_PARAMS_MISSING",
};

exports.ErrorMessages = {
  UNAUTHORIZED:
    "You are not authorized to access this url. Please pass the valid access code",
  SYSTEM_ERROR: "Something bad happened. Please contact Admin",
  MS_USER_NOT_EXIST: "Requesting user does not exist",
  MS_INVALID_TOKEN: "Token expired or invalid token",
  REQUEST_PARAMS_MISSING: "Params missing on your Request",
};

exports.AppConstants = {
  PRICE: "price",
  LOW_PRICE: "lowPrice",
  HIGH_PRICE: "highPrice",
  OLDEST: "oldest",
  NEWEST: "newest",
  DATE: "date",
  BUYER: "buyer",
  SELLER: "seller",
};
