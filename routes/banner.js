const express = require("express");
const router = express.Router();

const banner = require("../controller/banner")

const { upload } = require("../helpers/multer");

// Banner
router.post("/", upload.single("image"), banner.addBanner);
router.put("/:id", banner.editBanner);
router.delete("/:id", banner.deleteBanner);
router.get("/", banner.viewBanner);
router.get("/:id",banner.singleBanner);

module.exports = router;