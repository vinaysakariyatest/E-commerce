const orderModel = require("../models/order");
const cartModel = require("../models/cart");

// Cart Order
exports.cartOrder = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const id = req.params.id;

    const cartItems = await cartModel.find({ user_id: userId });

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.total,
      0
    );

    const Order = new orderModel({
      user_id: userId,
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        price: item.price,
        qty: item.qty,
        total: item.total,
      })),
      totalAmount: totalAmount,
    });

    if (Order) {
      await Order.save();

      // Clear user's cart
      await cartModel.deleteMany({ user_id: userId });

      return res.status(200).json({
        message: "Order placed successfully",
        Order: Order,
      });
    }else{
        return res.status(400).josn({
            message: "Failed to place order"
        })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
