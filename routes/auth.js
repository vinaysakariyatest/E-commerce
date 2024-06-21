const express = require('express');
const router = express.Router();
const user = require("../controller/user");
const auth = require("../middleware/auth")

router.post("/signin", user.registration);
router.post("/login",user.login);
router.get("/profile",auth,user.viewProfile);
router.put("/update-password",auth,user.updatePassword);
router.post("/forget-password",user.forget_password);
router.get("/reset-password",user.reset_password);

module.exports = router