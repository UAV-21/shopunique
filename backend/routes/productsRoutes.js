const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const db = require("../database/db");

// GET ALL PRODUCTS
router.get("/",productController.all_products);

// GET SINGLE PRODUCT BY ID
router.get("/:productId",productController.single_product);

// Create Product
router.post("/", productController.create_product);

// Update Product
router.put("/:productId", productController.update_product); 

// Delete Product
router.delete("/:productId", productController.delete_product);

module.exports = router;
