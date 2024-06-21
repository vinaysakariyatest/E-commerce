const express = require("express");
const router = express.Router();

const product = require("../controller/product");
const { upload } = require("../helpers/multer");


// Products
router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  product.addProduct
);
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 5 },
  ]),
  product.updateProduct
);
router.delete("/:id", product.deleteProduct);
router.get("/", product.viewProduct); // Get All Products
router.get("/:id", product.singleProduct); //Get Single Product
router.get("/category-products/:id", product.categoryproduct); // Get Product Category wise

module.exports = router;
