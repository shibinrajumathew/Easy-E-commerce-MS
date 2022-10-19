const { ProductModel } = require("../models/productDetailsModel");
var ObjectId = require("mongodb").ObjectId;

const createMyItem = async (myItemData) => {
  try {
    const {
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
    } = myItemData;

    const myItem = new ProductModel({
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
    });
    const result = await myItem.save();
    if (result.id) return result;
  } catch (error) {
    return error;
  }
};
const updateMyItem = async (id, updateObject) => {
  try {
    const result = await ProductModel.findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateObject },
      { new: true }
    );
    return result;
  } catch (error) {
    return error;
  }
};
const deleteMyItem = async (id) => {
  try {
    const result = await ProductModel.deleteOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    return error;
  }
};

exports.myItemRepository = {
  createMyItem,
  updateMyItem,
  deleteMyItem,
};
