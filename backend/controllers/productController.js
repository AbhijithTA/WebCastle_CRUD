const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    
    const totalItems = await Product.countDocuments();
    const totalPages = Math.ceil(totalItems / limit);

    
    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      products,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ err: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;

    if (!title || !price) {
      return res.status(400).json({ error: "Title and price are required" });
    }
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      image,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


exports.updateProduct = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, price, category, image },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};