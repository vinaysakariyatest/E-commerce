const express = require("express");
const router = express.Router();

const contactus = require("../controller/contactMessage");

// ContactUS
router.post("/", contactus.sentMessage);
router.delete("/:id", contactus.deleteMessage);
router.get("/", contactus.viewMessage);
router.get("/:id", contactus.singleMessage)

module.exports = router;
