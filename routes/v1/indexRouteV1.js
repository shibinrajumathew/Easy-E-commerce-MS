const express = require("express");
const router = express.Router();
const userRoute = require("./userRoute");
const categoryRoute = require("./categoryRoute");
const productRoute = require("./productRoute");
// /* GET home page. */
router.use("/", function (req, res, next) {
  req.response = "Welcome.";
  req.success = false;
  next();
});
router.use("/user", userRoute);
router.use("/category", categoryRoute);
router.use("/product", productRoute);

module.exports = router;
