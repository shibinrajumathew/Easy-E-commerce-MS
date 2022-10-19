const THUMsError = require("../errors/THUMsError");
const asyncHandler = require("../utils/asyncHandler");
const { userService } = require("../services/userService");
const registration = asyncHandler(async (req, res, next) => {
  const {
    body: { phoneNumber, customerName, location, image, address, storeName },
  } = req;
  const userData = {
    phoneNumber,
    customerName,
    location,
    image,
    address,
    storeName,
  };
  const responseData = await userService.registration(userData);
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});
const getUserProfile = asyncHandler(async (req, res, next) => {
  const {
    query: { countryCode, number },
  } = req;
  const phoneNumber = { countryCode, number };
  const responseData = await userService.getUserProfile(phoneNumber);
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const {
    body: { filterData, UpdateData },
  } = req;
  const responseData = await userService.updateUserProfile(
    filterData,
    UpdateData
  );
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});

exports.userController = {
  registration,
  getUserProfile,
  updateUserProfile,
};
