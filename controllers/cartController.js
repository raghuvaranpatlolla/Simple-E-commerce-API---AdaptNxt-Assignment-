const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get user's cart
exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
  res.json(cart || { items: [] });
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const product = await Product.findById(productId);
  if (!product) return res.status(404).json({ message: "Product not found" });

  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = new Cart({ user: req.user._id, items: [] });

  const item = cart.items.find((i) => i.product.equals(productId));
  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  res.json(cart);
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  const item = cart.items.id(itemId);
  if (!item) return res.status(404).json({ message: "Item not found" });
  item.quantity = quantity;
  await cart.save();
  res.json(cart);
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  const { itemId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  cart.items = cart.items.filter((i) => i._id.toString() !== itemId);
  await cart.save();
  res.json(cart);
};