const { userRepository } = require("../repository/userRepository");

const registration = async (userData) => {
  const response = await userRepository.registration(userData);
  return response;
};
const getUserProfile = async (phoneNumber) => {
  const response = await userRepository.getUserProfile(phoneNumber);
  return response;
};
const updateUserProfile = async (filterData, UpdateData) => {
  const response = await userRepository.updateUserProfile(
    filterData,
    UpdateData
  );
  return response;
};

exports.userService = {
  registration,
  getUserProfile,
  updateUserProfile,
};
