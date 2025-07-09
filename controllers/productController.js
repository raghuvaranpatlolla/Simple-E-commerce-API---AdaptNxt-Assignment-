const Product = require("../models/Product");

// List products with pagination and search
exports.listProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, category } = req.query;
    const filter = {};
    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    const products = await Product.find(filter)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Product.countDocuments(filter);
    res.json({ total, page: Number(page), limit: Number(limit), products });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

// Admin: add product
exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const product = new Product({ name, description, price, category, stock });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: "Failed to add product", error: err.message });
  }
};

// Admin: update product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Failed to update product" });
  }
};

// Admin: delete product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete product" });
  }
};

// Get single product
exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: "Failed to get product" });
  }
};