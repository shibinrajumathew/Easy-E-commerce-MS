const express = require("express");
const { userController } = require("../../controllers/userController");
const { userValidator } = require("../../validators/userValidator");
const router = express.Router();
/* GET home page. */
router.use("/", function (req, res, next) {
  req.response = "Not Found";
  req.success = false;
  next();
});
router.post(
  "/registration",
  userValidator.validateRegistration,
  userController.registration
);
router.get(
  "/profile",
  userValidator.validateGetProfile,
  userController.getUserProfile
);
router.post(
  "/profile",
  userValidator.validateUpdateProfile,
  userController.updateUserProfile
);
router.get("/verify", function (req, res, next) {
  req.success = true;
  req.response = "verify";
  next();
});

module.exports = router;
