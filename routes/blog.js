const express = require("express");
const router = express.Router();

const blog = require("../controller/blog")
const { upload } = require("../helpers/multer");

// Blog
router.post("/", upload.single("image"), blog.createBlog);
router.put("/:id", blog.editBlog);
router.delete("/:id", blog.deleteBlog);
router.get("/", blog.viewBlog);
router.get("/:id", blog.singleBlog);

module.exports = router;
