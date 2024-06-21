const express = require("express");
const router = express.Router();
const contact = require("../controller/contact");

// Contact
router.post("/", contact.addContact);
router.put("/:id", contact.editContact);
router.delete("/:id", contact.deleteContact);
router.get("/", contact.viewContact);

module.exports = router;
