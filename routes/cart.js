const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/auth");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} = require("../controllers/cartController");

router.get("/", authenticateToken, authorizeRoles("customer"), getCart);
router.post("/", authenticateToken, authorizeRoles("customer"), addToCart);
router.put("/:itemId", authenticateToken, authorizeRoles("customer"), updateCartItem);
router.delete("/:itemId", authenticateToken, authorizeRoles("customer"), removeCartItem);

module.exports = router;