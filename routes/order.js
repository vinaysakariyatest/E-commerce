const express = require("express");
const router = express.Router();
const order = require("../controller/order");
const auth = require("../middleware/auth")

router.post("/place-order",auth.check_token,order.cartOrder);

module.exports = router;
