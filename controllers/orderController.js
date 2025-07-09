const Cart = require("../models/Cart");
const Order = require("../models/Order");
const Product = require("../models/Product");

// Create order from cart
exports.createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  let total = 0;
  for (const item of cart.items) {
    if (!item.product) continue;
    total += item.product.price * item.quantity;
    // Optionally: reduce stock
    if (item.product.stock !== undefined) item.product.stock -= item.quantity;
    await item.product.save();
  }

  const order = new Order({
    user: req.user._id,
    items: cart.items.map((i) => ({
      product: i.product._id,
      quantity: i.quantity,
    })),
    total,
  });
  await order.save();

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

// Get orders: customer = own orders, admin = all
exports.getOrders = async (req, res) => {
  let filter = {};
  if (req.user.role === "customer") filter.user = req.user._id;
  const orders = await Order.find(filter).populate("items.product user", "-password");
  res.json(orders);
};