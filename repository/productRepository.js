const {
  AppConstants,
  ErrorMessages,
  ErrorCodes,
} = require("../utils/constants");
const { ProductModel } = require("../models/productDetailsModel");
const RequestValidationError = require("../errors/RequestValidationError");
var ObjectId = require("mongodb").ObjectId;
const getProducts = async (urlParams) => {
  try {
    const {
      userName,
      doSort,
      doFilter,
      sortType,
      sortOrder,
      userType,
      category,
      subCategory,
      pinCode,
    } = urlParams;
    const {
      PRICE,
      LOW_PRICE,
      HIGH_PRICE,
      OLDEST,
      NEWEST,
      DATE,
      BUYER,
      SELLER,
    } = AppConstants;
    if (userType == SELLER) {
      if (userName) {
        if (doSort == true && doFilter == false) {
          if (sortType && sortOrder) {
            if (sortType == PRICE && sortOrder == LOW_PRICE) {
              const result = sortProductSeller(userName, { price: 1 });
              if (result) return result;
            } else if (sortType == PRICE && sortOrder == HIGH_PRICE) {
              const result = sortProductSeller(userName, { price: -1 });
              if (result) return result;
            } else if (sortType == DATE && sortOrder == NEWEST) {
              const result = sortProductSeller(userName, { createdAt: -1 });
              if (result) return result;
            } else if (sortType == DATE && sortOrder == OLDEST) {
              const result = sortProductSeller(userName, { createdAt: 1 });
              if (result) return result;
            }
          } else {
            if (sortType)
              throw new RequestValidationError(
                ErrorCodes.REQUEST_PARAMS_MISSING,
                "sortOrder_is_missing"
              );
            else if (sortOrder)
              throw new RequestValidationError(
                ErrorCodes.REQUEST_PARAMS_MISSING,
                "sortType_is_missing"
              );
            else
              throw new RequestValidationError(
                ErrorCodes.REQUEST_PARAMS_MISSING,
                "sortType_and_sortOrder_is_missing"
              );
          }
        } else if (doSort == false && doFilter == true) {
          if (pinCode && subCategory) {
            const result = await ProductModel.find({
              $and: [
                { "ownerDetails.username": userName },
                { "ownerDetails.pinCode": pinCode },
                { subCategory: subCategory },
              ],
            });
            if (result) return result;
          } else if (pinCode && category) {
            const result = await ProductModel.find({
              $and: [
                { "ownerDetails.username": userName },
                { "ownerDetails.pinCode": pinCode },
                { category: category },
              ],
            });
            if (result) return result;
          } else if (subCategory) {
            const result = await ProductModel.find({
              $and: [
                { "ownerDetails.username": userName },
                { subCategory: subCategory },
              ],
            });
            if (result) return result;
          } else if (category) {
            const result = await ProductModel.find({
              $and: [
                { "ownerDetails.username": userName },
                { category: category },
              ],
            });
            if (result) return result;
          } else if (pinCode) {
            const result = await ProductModel.find({
              $and: [
                { "ownerDetails.username": userName },
                { "ownerDetails.pinCode": pinCode },
              ],
            });
            if (result) return result;
          } else {
            throw new RequestValidationError(
              ErrorCodes.REQUEST_PARAMS_MISSING,
              "enter any filter condition (category,subCategory,pinCode)"
            );
          }
        } else if (doSort == true && doFilter == true) {
          if (sortType && sortOrder) {
            if (pinCode && subCategory) {
              if (sortOrder == LOW_PRICE) {
                const result = sortFilterSellerPinSubCat(
                  userName,
                  pinCode,
                  subCategory,
                  { price: 1 }
                );
                if (result) return result;
              } else if (sortOrder == HIGH_PRICE) {
                const result = sortFilterSellerPinSubCat(
                  userName,
                  pinCode,
                  subCategory,
                  { price: -1 }
                );
                if (result) return result;
              } else if (sortOrder == NEWEST) {
                const result = sortFilterSellerPinSubCat(
                  userName,
                  pinCode,
                  subCategory,
                  { createdAt: -1 }
                );
                if (result) return result;
              } else if (sortOrder == OLDEST) {
                console.log("hai");
                const result = sortFilterSellerPinSubCat(
                  userName,
                  pinCode,
                  subCategory,
                  { createdAt: 1 }
                );
                if (result) return result;
              }
            } else if (pinCode && category) {
              if (sortOrder == LOW_PRICE) {
                const result = sortFilterSellerPinCat(
                  userName,
                  pinCode,
                  category,
                  { price: 1 }
                );
                if (result) return result;
              } else if (sortOrder == HIGH_PRICE) {
                const result = sortFilterSellerPinCat(
                  userName,
                  pinCode,
                  category,
                  { price: -1 }
                );
                if (result) return result;
              } else if (sortOrder == NEWEST) {
                const result = sortFilterSellerPinCat(
                  userName,
                  pinCode,
                  category,
                  { createdAt: -1 }
                );
                if (result) return result;
              } else if (sortOrder == OLDEST) {
                const result = sortFilterSellerPinCat(
                  userName,
                  pinCode,
                  category,
                  { createdAt: 1 }
                );
                if (result) return result;
              }
            } else if (subCategory) {
              if (sortOrder == LOW_PRICE) {
                const result = sortFilterSellerSubCat(userName, subCategory, {
                  price: 1,
                });
                if (result) return result;
              } else if (sortOrder == HIGH_PRICE) {
                const result = sortFilterSellerSubCat(userName, subCategory, {
                  price: -1,
                });
                if (result) return result;
              } else if (sortOrder == NEWEST) {
                const result = sortFilterSellerSubCat(userName, subCategory, {
                  createdAt: -1,
                });
                if (result) return result;
              } else if (sortOrder == OLDEST) {
                const result = sortFilterSellerSubCat(userName, subCategory, {
                  createdAt: 1,
                });
                if (result) return result;
              }
            } else if (category) {
              if (sortOrder == LOW_PRICE) {
                const result = sortFilterSellerCat(userName, category, {
                  price: 1,
                });
                if (result) return result;
              } else if (sortOrder == HIGH_PRICE) {
                const result = sortFilterSellerCat(userName, category, {
                  price: -1,
                });
                if (result) return result;
              } else if (sortOrder == NEWEST) {
                const result = sortFilterSellerCat(userName, category, {
                  createdAt: -1,
                });
                if (result) return result;
              } else if (sortOrder == OLDEST) {
                const result = sortFilterSellerCat(userName, category, {
                  createdAt: 1,
                });
                if (result) return result;
              }
            } else if (pinCode) {
              if (sortOrder == LOW_PRICE) {
                const result = sortFilterSellerPin(userName, pinCode, {
                  price: 1,
                });
                if (result) return result;
              } else if (sortOrder == HIGH_PRICE) {
                const result = sortFilterSellerPin(userName, pinCode, {
                  price: -1,
                });
                if (result) return result;
              } else if (sortOrder == NEWEST) {
                const result = sortFilterSellerPin(userName, pinCode, {
                  createdAt: -1,
                });
                if (result) return result;
              } else if (sortOrder == OLDEST) {
                const result = sortFilterSellerPin(userName, pinCode, {
                  createdAt: 1,
                });
                if (result) return result;
              }
            } else {
              throw new RequestValidationError(
                ErrorCodes.REQUEST_PARAMS_MISSING,
                "enter any filter condition (category,subCategory,pinCode)"
              );
            }
          } else {
            if (sortType)
              throw new RequestValidationError(
                ErrorCodes.REQUEST_PARAMS_MISSING,
                "sortOrder_is_missing"
              );
            else if (sortOrder)
              throw new RequestValidationError(
                ErrorCodes.REQUEST_PARAMS_MISSING,
                "sortType_is_missing"
              );
            else
              throw new RequestValidationError(
                ErrorCodes.REQUEST_PARAMS_MISSING,
                "sortType_and_sortOrder_is_missing"
              );
          }
        } else doSort == false && doFilter == false;
        const result = await ProductModel.find({
          "ownerDetails.username": userName,
        });
        if (result) return result;
      } else {
        throw new RequestValidationError(
          ErrorCodes.REQUEST_PARAMS_MISSING,
          "userName_is_missing"
        );
      }
    } else userType == BUYER;
    if (doSort == true && doFilter == false) {
      if (sortType && sortOrder) {
        if (sortType == PRICE && sortOrder == LOW_PRICE) {
          const result = sortProductBuyer({ price: 1 });
          if (result) return result;
        } else if (sortType == PRICE && sortOrder == HIGH_PRICE) {
          const result = sortProductBuyer({ price: -1 });
          if (result) return result;
        } else if (sortType == DATE && sortOrder == NEWEST) {
          const result = sortProductBuyer({ createdAt: -1 });
          if (result) return result;
        } else if (sortType == DATE && sortOrder == OLDEST) {
          const result = sortProductBuyer({ createdAt: 1 });
          if (result) return result;
        }
      } else {
        if (sortType)
          throw new RequestValidationError(
            ErrorCodes.REQUEST_PARAMS_MISSING,
            "sortOrder_is_missing"
          );
        else if (sortOrder)
          throw new RequestValidationError(
            ErrorCodes.REQUEST_PARAMS_MISSING,
            "sortType_is_missing"
          );
        else
          throw new RequestValidationError(
            ErrorCodes.REQUEST_PARAMS_MISSING,
            "sortType_and_sortOrder_is_missing"
          );
      }
    } else if (doSort == false && doFilter == true) {
      if (pinCode && subCategory) {
        const result = await ProductModel.find({
          $and: [
            { "ownerDetails.pinCode": pinCode },
            { subCategory: subCategory },
          ],
        });
        if (result) return result;
      } else if (pinCode && category) {
        const result = await ProductModel.find({
          $and: [{ "ownerDetails.pinCode": pinCode }, { category: category }],
        });
        if (result) return result;
      } else if (subCategory) {
        const result = await ProductModel.find({ subCategory: subCategory });
        if (result) return result;
      } else if (category) {
        const result = await ProductModel.find({ category: category });
        if (result) return result;
      } else if (pinCode) {
        const result = await ProductModel.find({
          "ownerDetails.pinCode": pinCode,
        });
        if (result) return result;
      } else {
        throw new RequestValidationError(
          ErrorCodes.REQUEST_PARAMS_MISSING,
          "enter any filter condition (category,subCategory,pinCode)"
        );
      }
    } else if (doSort == true && doFilter == true) {
      if (sortType && sortOrder) {
        if (pinCode && subCategory) {
          if (sortOrder == LOW_PRICE) {
            const result = sortFilterBuyerPinSubCat(pinCode, subCategory, {
              price: 1,
            });
            if (result) return result;
          } else if (sortOrder == HIGH_PRICE) {
            const result = sortFilterBuyerPinSubCat(pinCode, subCategory, {
              price: -1,
            });
            if (result) return result;
          } else if (sortOrder == NEWEST) {
            const result = sortFilterBuyerPinSubCat(pinCode, subCategory, {
              createdAt: -1,
            });
            if (result) return result;
          } else if (sortOrder == OLDEST) {
            const result = sortFilterBuyerPinSubCat(pinCode, subCategory, {
              createdAt: 1,
            });
            if (result) return result;
          }
        } else if (pinCode && category) {
          if (sortOrder == LOW_PRICE) {
            const result = sortFilterBuyerPinCat(pinCode, category, {
              price: 1,
            });
            if (result) return result;
          } else if (sortOrder == HIGH_PRICE) {
            const result = sortFilterBuyerPinCat(pinCode, category, {
              price: -1,
            });
            if (result) return result;
          } else if (sortOrder == NEWEST) {
            const result = sortFilterBuyerPinCat(pinCode, category, {
              createdAt: -1,
            });
            if (result) return result;
          } else if (sortOrder == OLDEST) {
            const result = sortFilterBuyerPinCat(pinCode, category, {
              createdAt: 1,
            });
            if (result) return result;
          }
        } else if (subCategory) {
          if (sortOrder == LOW_PRICE) {
            const result = sortFilterBuyerSubCat(subCategory, {
              price: 1,
            });
            if (result) return result;
          } else if (sortOrder == HIGH_PRICE) {
            const result = sortFilterBuyerSubCat(subCategory, {
              price: -1,
            });
            if (result) return result;
          } else if (sortOrder == NEWEST) {
            const result = sortFilterBuyerSubCat(subCategory, {
              createdAt: -1,
            });
            if (result) return result;
          } else if (sortOrder == OLDEST) {
            const result = sortFilterBuyerSubCat(subCategory, {
              createdAt: 1,
            });
            if (result) return result;
          }
        } else if (category) {
          if (sortOrder == LOW_PRICE) {
            const result = sortFilterBuyerCat(category, {
              price: 1,
            });
            if (result) return result;
          } else if (sortOrder == HIGH_PRICE) {
            const result = sortFilterBuyerCat(category, {
              price: -1,
            });
            if (result) return result;
          } else if (sortOrder == NEWEST) {
            const result = sortFilterBuyerCat(category, {
              createdAt: -1,
            });
            if (result) return result;
          } else if (sortOrder == OLDEST) {
            const result = sortFilterBuyerCat(category, {
              createdAt: 1,
            });
            if (result) return result;
          }
        } else if (pinCode) {
          if (sortOrder == LOW_PRICE) {
            const result = sortFilterBuyerPin(pinCode, {
              price: 1,
            });
            if (result) return result;
          } else if (sortOrder == HIGH_PRICE) {
            const result = sortFilterBuyerPin(pinCode, {
              price: -1,
            });
            if (result) return result;
          } else if (sortOrder == NEWEST) {
            const result = sortFilterBuyerPin(pinCode, {
              createdAt: -1,
            });
            if (result) return result;
          } else if (sortOrder == OLDEST) {
            const result = sortFilterBuyerPin(pinCode, {
              createdAt: 1,
            });
            if (result) return result;
          }
        } else {
          throw new RequestValidationError(
            ErrorCodes.REQUEST_PARAMS_MISSING,
            "enter any filter condition (category,subCategory,pinCode)"
          );
        }
      } else {
        if (sortType)
          throw new RequestValidationError(
            ErrorCodes.REQUEST_PARAMS_MISSING,
            "sortOrder_is_missing"
          );
        else if (sortOrder)
          throw new RequestValidationError(
            ErrorCodes.REQUEST_PARAMS_MISSING,
            "sortType_is_missing"
          );
        else
          throw new RequestValidationError(
            ErrorCodes.REQUEST_PARAMS_MISSING,
            "sortType_and_sortOrder_is_missing"
          );
      }
    } else doSort == false && doFilter == false;
    const result = await ProductModel.find({});
    if (result) return result;
  } catch (error) {
    return error;
  }
};

let sortProductSeller = async (userName, sortObject) => {
  try {
    const result = await ProductModel.find({
      "ownerDetails.username": userName,
    }).sort(sortObject);
    return result;
  } catch (error) {
    return error;
  }
};

let sortProductBuyer = async (sortObject) => {
  try {
    const result = await ProductModel.find({}).sort(sortObject);
    return result;
  } catch (error) {
    return error;
  }
};

let sortFilterSellerPinSubCat = async (
  userName,
  pinCode,
  subCategory,
  sortObject
) => {
  try {
    const result = await ProductModel.find({
      $and: [
        { "ownerDetails.username": userName },
        { "ownerDetails.pinCode": pinCode },
        { subCategory: subCategory },
      ],
    }).sort(sortObject);
    return result;
  } catch (error) {
    return error;
  }
};
let sortFilterSellerPinCat = async (
  userName,
  pinCode,
  category,
  sortObject
) => {
  try {
    const result = await ProductModel.find({
      $and: [
        { "ownerDetails.username": userName },
        { "ownerDetails.pinCode": pinCode },
        { category: category },
      ],
    }).sort(sortObject);
    return result;
  } catch (error) {
    return error;
  }
};
let sortFilterSellerSubCat = async (userName, subCategory, sortObject) => {
  try {
    const result = await ProductModel.find({
      $and: [
        { "ownerDetails.username": userName },
        { subCategory: subCategory },
      ],
    }).sort(sortObject);
    return result;
  } catch (error) {
    return error;
  }
};
let sortFilterSellerCat = async (userName, category, sortObject) => {
  try {
    const result = await ProductModel.find({
      $and: [{ "ownerDetails.username": userName }, { category: category }],
    }).sort(sortObject);
    return result;
  } catch (error) {
    return error;
  }
};
let sortFilterSellerPin = async (userName, pinCode, sortObject) => {
  try {
    const result = await ProductModel.find({
      $and: [{ "ownerDetails.username": userName }, { pinCode: pinCode }],
    }).sort(sortObject);
    return result;
  } catch (error) {
    return error;
  }
};
let sortFilterBuyerPinSubCat = async (pinCode, subCategory, sortObject) => {
  try {
    const result = await ProductModel.find({
      $and: [{ "ownerDetails.pinCode": pinCode }, { subCategory: subCategory }],
    }).sort(sortObject);
    return result;
  } catch (error) {
    return error;
  }
};
let sortFilterBuyerPinCat = async (pinCode, category, sortObject) => {
  try {
    const result = await ProductModel.find({
      $and: [{ "ownerDetails.pinCode": pinCode }, { category: category }],
    }).sort(sortObject);
    return result;
  } catch (error) {
    return error;
  }
};
let sortFilterBuyerSubCat = async (subCategory, sortObject) => {
  try {
    const result = await ProductModel.find({ subCategory: subCategory }).sort(
      sortObject
    );
    return result;
  } catch (error) {
    return error;
  }
};
let sortFilterBuyerCat = async (category, sortObject) => {
  try {
    const result = await ProductModel.find({ category: category }).sort(
      sortObject
    );
    return result;
  } catch (error) {
    return error;
  }
};
let sortFilterBuyerPin = async (pinCode, sortObject) => {
  try {
    const result = await ProductModel.find({ pinCode: pinCode }).sort(
      sortObject
    );
    return result;
  } catch (error) {
    return error;
  }
};

const getProductDetails = async (id) => {
  try {
    const result = await ProductModel.findOne({ _id: ObjectId(id) });
    if (result) return result;
  } catch (error) {
    return error;
  }
};
exports.productRepository = {
  getProducts,
  getProductDetails,
};
