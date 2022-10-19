const { UserModel } = require("../models/userModel");

const registration = async (userData) => {
  try {
    const { mobileNo, phoneNumber, location, image, address, storeName } =
      userData;

    const user = new UserModel({
      mobileNo,
      phoneNumber,
      location,
      image,
      address,
    });
    const result = await user.save();
    if (result.id) return result;
  } catch (error) {
    return error;
  }
};
const getUserProfile = async (phoneNumber) => {
  try {
    const result = await UserModel.findOne({ phoneNumber });
    if (result) return result;
  } catch (error) {
    return error;
  }
};
const updateUserProfile = async (filterData, UpdateData) => {
  try {
    const result = await UserModel.findOneAndUpdate(filterData, UpdateData, {
      new: true,
    });
    if (result) return result;
  } catch (error) {
    return error;
  }
};

exports.userRepository = {
  registration,
  getUserProfile,
  updateUserProfile,
};
