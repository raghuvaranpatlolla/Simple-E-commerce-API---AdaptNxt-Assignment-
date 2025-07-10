const express = require("express");
const router = express.Router();
const { authenticateToken, authorizeRoles } = require("../middleware/auth");
const {
  listProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
} = require("../controllers/productController");

// Public: list & view products
router.get("/", listProducts);  
router.get("/:id", getProduct);

// Admin: manage products
router.post("/", authenticateToken, authorizeRoles("admin"), addProduct);
router.put("/:id", authenticateToken, authorizeRoles("admin"), updateProduct);
router.delete("/:id", authenticateToken, authorizeRoles("admin"), deleteProduct);

module.exports = router;