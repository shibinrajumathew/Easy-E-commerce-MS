const { dbLib } = require("../utils/dbLibHandler");

const { Schema, model } = dbLib;
const subCategoryAttributes = new Schema(
  {
    name: String,
    imageUrl: String,
    subcategories: Object,
  },
  { _id: true }
);

const getRecursiveSchema = (count) => {
  if (count >= 5) return subCategoryAttributes;
  return new Schema(
    {
      name: String,
      imageUrl: String,
      subcategories: [getRecursiveSchema(count + 1)],
    },
    { _id: true }
  );
};
const categoryAttributes = {
  name: String,
  imageUrl: String,
  subcategories: [getRecursiveSchema(0)],
};
const categoryCollectionDetails = {
  collection: "category",
  timestamps: true,
  __v: false,
};
const categorySchema = new Schema(
  categoryAttributes,
  categoryCollectionDetails
);

module.exports.CategoryModel = model("CategoryModel", categorySchema);
