const { categoryService } = require("../services/categoryService");
const asyncHandler = require("../utils/asyncHandler");
const saveCategory = asyncHandler(async (req, res, next) => {
  const { categoryItem, parentCategory, subcategoryItems } = req;
  const categoryData = { categoryItem, parentCategory, subcategoryItems };
  const responseData = await categoryService.saveCategory(categoryData);
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});

const getCategory = asyncHandler(async (req, res, next) => {
  const responseData = await categoryService.getCategory();
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});

exports.categoryController = {
  saveCategory,
  getCategory,
};
