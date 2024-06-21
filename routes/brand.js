const express = require("express");
const router = express.Router();
const brand = require("../controller/brand");

// Brand
router.post("/", brand.addBrand);
router.put("/:id", brand.editBrand);
router.delete("/:id", brand.deleteBrand);
router.get("/", brand.viewBrand);
router.get("/:id", brand.singleBrand);

module.exports = router;
