const { categoryRepository } = require("../repository/categoryRepository");

const saveCategory = async (categoryData) => {
  const response = await categoryRepository.saveCategory(categoryData);
};

const getCategory = async () => {
  const response = await categoryRepository.getCategory();
  return response;
};
exports.categoryService = {
  saveCategory,
  getCategory,
};
