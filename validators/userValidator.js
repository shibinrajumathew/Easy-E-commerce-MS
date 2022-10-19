const { resultHandler, check, query } = require("../utils/validator");

const validateRegistration = resultHandler([
  check("phoneNumber").not().isEmpty(),
  check("customerName").not().isEmpty(),
]);

const validateGetProfile = resultHandler([
  query("countryCode").not().isEmpty(),
  query("number").not().isEmpty(),
]);

const validateUpdateProfile = resultHandler([
  check("filterData").not().isEmpty(),
  check("UpdateData").not().isEmpty(),
]);

exports.userValidator = {
  validateRegistration,
  validateGetProfile,
  validateUpdateProfile,
};
