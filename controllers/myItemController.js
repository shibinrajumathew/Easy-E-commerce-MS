const THUMsError = require("../errors/THUMsError");
const asyncHandler = require("../utils/asyncHandler");
const { myItemService } = require("../services/myItemService");

const myItemCreate = asyncHandler(async (req, res, next) => {
  const {
    body: {
      name,
      price,
      description,
      imageUrl,
      category,
      subCategory,
      deliveryDetails,
      paymentDetails,
      ownerDetails,
      sellingOptions,
      isActive,
    },
  } = req;
  const myItemData = {
    name,
    price,
    description,
    imageUrl,
    category,
    subCategory,
    deliveryDetails,
    paymentDetails,
    ownerDetails,
    sellingOptions,
    isActive,
  };
  const responseData = await myItemService.createMyItem(myItemData);
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});
const updateMyItem = asyncHandler(async (req, res, next) => {
  const {
    body: {
      _id: id,
      name,
      price,
      description,
      imageUrl,
      category,
      subCategory,
      deliveryDetails,
      paymentDetails,
      ownerDetails,
      sellingOptions,
      isActive,
    },
  } = req;
  const updatedItem = {
    name,
    price,
    description,
    imageUrl,
    category,
    subCategory,
    deliveryDetails,
    paymentDetails,
    ownerDetails,
    sellingOptions,
    isActive,
  };
  const responseData = await myItemService.updateMyItem(id, updatedItem);
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});
const deleteMyItem = asyncHandler(async (req, res, next) => {
  const {
    params: { id },
  } = req;
  const responseData = await myItemService.deleteMyItem(id);
  if (!responseData || responseData == null) {
    throw new THUMsError();
  }
  req.success = true;
  req.response = responseData;
  next();
});

exports.myItemController = {
  myItemCreate,
  updateMyItem,
  deleteMyItem,
};
