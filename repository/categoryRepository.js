const { CategoryModel } = require("../models/categoryModel");

const saveCategory = async (categoryData) => {
  try {
    const { categoryItem, parentCategory, subcategoryItems } = categoryData;
    const category = new CategoryModel({
      categoryItem,
      parentCategory,
      subcategoryItems,
    });
    const result = await category.save();
    if (result.id) return result;
  } catch (error) {
    return error;
  }
};

const getCategory = async () => {
  try {
    const result = await CategoryModel.find({}, {});
    if (result) return result;
  } catch (error) {
    return error;
  }
};
exports.categoryRepository = {
  saveCategory,
  getCategory,
};
