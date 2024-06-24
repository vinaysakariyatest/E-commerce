const CartModel = require("../models/cart");
const ProductModel = require("../models/product");

// Product Add To Cart
exports.addToCart = async (req, res) => {
  try {
    const { qty = 1 } = req.body;

    const userId = req.decoded.id;

    const productId = req.params.id;

    // const { qty } = req.body;

    const productData = await ProductModel.findOne({ _id: productId });

    if (!productData) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const price = productData.price;
    const total = productData.price * qty;

    const cartData = await CartModel.findOne({
      product_id: productId,
      user_id: userId,
    });

    if (cartData) {
      const updateQty = cartData.qty + Number(qty);
      const updatePrice = price * updateQty;

      const updateCart = await CartModel.updateOne(
        { _id: cartData._id },
        {
          $set: {
            qty: updateQty,
            total: updatePrice,
          },
        }
      );

      return res.status(200).json({
        message: "Cart updated",
      });
    } else {
      const addCart = new CartModel({
        product_id: productId,
        price: price,
        qty,
        total: total,
        user_id: userId,
      });

      await addCart.save();

      return res.status(200).json({
        message: "Product added to cart successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Remove Product Form Cart
exports.removeProduct = async (req, res) => {
    try {
        const cartId = req.params.id;
        const userId = req.decoded.id;

        const findCartData = await CartModel.findOne({ _id: cartId, user_id: userId });

        if(!findCartData || findCartData.length === 0){
            return res.status(404).json({
                message: "Data for cart not found",
            })
        }

        await CartModel.findByIdAndDelete(cartId);

        return res.status(200).json({
            message: "Product removed successfully",
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Delete All Cart Data
exports.deleteCart = async (req, res) => {
    try {
        const userId = req.decoded.id;

        const cartData = await CartModel.find({ user_id: userId });

        if(!cartData || cartData.length === 0){
            return res.status(404).json({
                message: "Data for cart not found",
            })
        }

        await CartModel.deleteMany({user_id: userId});

        return res.status(200).json({
            message: "Cart Deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// View Cart
exports.viewCart = async (req, res) => {
    try {
        const userId = req.decoded.id;

        const showCart = await CartModel.find({ user_id: userId });

        if(!showCart || showCart.length === 0){
            return res.status(404).json({
                message: "Cart is empty",
            })
        }

        return res.status(200).json({
            message: showCart
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// View All Cart Details
exports.allCartDetails = async (req, res) => {
    try {
        const cartData = await CartModel.find()

        if(!cartData || cartData.length === 0){
            return res.status(404).json({
                message: "Cart is empty",
            })
        }

        return res.status(200).json({
            CartData: cartData
        })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
