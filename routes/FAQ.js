const express = require("express");
const router = express.Router();
const { upload } = require("../helpers/multer");

const faq = require("../controller/FAQ");

// FAQ
router.post("/", faq.addFAQ);
router.put("/:id", faq.editFAQ);
router.delete("/:id", faq.deleteFAQ);
router.get("/", faq.viewFAQ);
router.get("/:id",faq.singleFAQ)

module.exports = router;
