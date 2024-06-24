const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const cart = require("../controller/cart")

router.post("/:id",auth.check_token,cart.addToCart);
router.get("/my-cart",auth.check_token,cart.viewCart);
router.delete("/remove-cart/:id",auth.check_token,cart.removeProduct);
router.delete("/delete-cart",auth.check_token,cart.deleteCart);

router.get("/",auth.authorize,cart.allCartDetails)

module.exports = router
