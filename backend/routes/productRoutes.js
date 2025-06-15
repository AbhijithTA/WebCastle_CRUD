const express = require("express");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const router = express.Router();

//Getting all Products
router.get("/", getAllProducts);

//Getting a single Product using ID
router.get("/:id", getProductById);

//Create new Product
router.post("/", createProduct);

//update a Product
router.put("/:id", updateProduct);

//Deleting a product by id
router.delete("/:id", deleteProduct);

module.exports = router;
