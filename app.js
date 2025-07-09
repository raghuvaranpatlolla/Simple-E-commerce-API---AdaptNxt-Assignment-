const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/orders");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("E-commerce API is running!");
});

module.exports = app;