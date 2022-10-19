const { dbLib } = require("../utils/dbLibHandler");

const { Schema, model } = dbLib;

const isAvailableSchema = new Schema({
  isAvailableForRent: Boolean,
  isAvailableForPurchase: Boolean,
});
const priceDetailsSchema = new Schema({
  price: Number,
  negotiable: Boolean,
});
const rentDetailsSchema = new Schema({
  price: Number,
  type: String,
});

const productAttributes = {
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: { type: String },
  category: { type: String },
  subCategory: { type: String },
  deliveryDetails: {
    homeDelivery: Boolean,
    pickup: Boolean,
  },
  paymentDetails: {
    upi: Boolean,
    cardPayment: Boolean,
    cash: Boolean,
  },
  ownerDetails: {
    username: String,
    name: String,
    email: String,
    address: String,
    phone: String,
    pinCode: String,
  },
  sellingOptions: {
    type: Object,
    isAvailableSchema,
    priceDetails: {
      priceDetailsSchema,
    },
    rentDetails: {
      rentDetailsSchema,
    },
  },
  isActive: Boolean,
};
const productCollectionDetails = {
  collection: "products",
  timestamps: true,
  __v: false,
};

const productSchema = new Schema(productAttributes, productCollectionDetails);
module.exports.ProductModel = model("ProductModel", productSchema);
