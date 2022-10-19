const { dbLib } = require("../utils/dbLibHandler");

const { Schema, model } = dbLib;

const userAttributes = {
  customerName: String,
  location: String,
  image: String,
  address: String,
  phoneNumber: {
    countryCode: String,
    number: String,
  },
};
const userCollectionDetails = {
  collection: "user",
  timestamps: true,
  __v: false,
};
const userSchema = new Schema(userAttributes, userCollectionDetails);

userSchema.index({ phoneNumber: 1 });

module.exports.UserModel = model("UserModel", userSchema);
