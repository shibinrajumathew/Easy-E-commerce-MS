const { resultHandler, check, query } = require("../utils/validator");

const validateProductQuery = resultHandler([
  query("doSort").not().isEmpty(),
  query("doFilter").not().isEmpty(),
  query("userType").not().isEmpty(),
]);

exports.productValidator = {
  validateProductQuery,
};
