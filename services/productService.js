const { productRepository } = require("../repository/productRepository");

const getProducts = async (urlParams) => {
  const response = await productRepository.getProducts(urlParams);
  return response;
};
const getProductDetails = async (id) => {
  const response = await productRepository.getProductDetails(id);
  return response;
};
exports.productService = {
  getProducts,
  getProductDetails,
};
