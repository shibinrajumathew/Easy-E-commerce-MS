const { myItemRepository } = require("../repository/myItemRepository");

const createMyItem = async (myItemData) => {
  const response = await myItemRepository.createMyItem(myItemData);
  return response;
};
const updateMyItem = async (id, updateObject) => {
  const response = await myItemRepository.updateMyItem(id, updateObject);
  return response;
};
const deleteMyItem = async (id) => {
  const response = await myItemRepository.deleteMyItem(id);
  return response;
};
exports.myItemService = {
  createMyItem,
  updateMyItem,
  deleteMyItem,
};
