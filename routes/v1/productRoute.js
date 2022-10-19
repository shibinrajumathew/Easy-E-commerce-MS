const express = require("express");
const { myItemController } = require("../../controllers/myItemController");
const { productController } = require("../../controllers/productController");
const { productValidator } = require("../../validators/productValidator");
const router = express.Router();

router.get("/details/:id", productController.getProductDetails);
// seller actions
router.get("/list/",productValidator.validateProductQuery, productController.getProducts);
router.post("/create/", myItemController.myItemCreate);
router.patch("/update/", myItemController.updateMyItem);
router.delete("/delete/:id", myItemController.deleteMyItem);
module.exports = router;
