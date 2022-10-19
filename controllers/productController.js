const THUMsError = require("../errors/THUMsError");
const asyncHandler = require("../utils/asyncHandler");
const { productService } = require("../services/productService");

const getProducts = asyncHandler(async (req, res, next) => {
  let {
    query: { userName, doSort, doFilter, sortType, sortOrder, userType , category , subCategory , pinCode},
  } = req;
  doSort = doSort === "true" ? true : false;
  doFilter = doFilter === "true" ? true : false;
  const urlParams = {
    userName,
    doSort,
    doFilter,
    sortType,
    sortOrder,
    userType,
    category,
    subCategory,
    pinCode
  };
  const responseData = await productService.getProducts(urlParams);
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});
const getProductDetails = asyncHandler(async (req, res, next) => {
  let {
    params: { id },
  } = req;
  const responseData = await productService.getProductDetails(id);
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});
exports.productController = {
  getProducts,
  getProductDetails,
};
