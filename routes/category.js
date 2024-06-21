const express = require("express");
const router = express.Router();
const category = require("../controller/category");

const { upload } = require("../helpers/multer");

// Category
router.post("/", category.addCategory);
router.put("/:id", category.editCategory);
router.delete("/:id", category.deleteCategory);
router.get("/", category.viewCategory);
router.get("/:id",category.singleCategory)

module.exports = router;
