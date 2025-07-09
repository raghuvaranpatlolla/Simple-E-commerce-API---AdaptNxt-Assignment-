const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { createOrder, getOrders } = require("../controllers/orderController");

router.post("/", authenticateToken, createOrder);
router.get("/", authenticateToken, getOrders);

module.exports = router;