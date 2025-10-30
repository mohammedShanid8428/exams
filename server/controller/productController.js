const { json } = require('express');
const Product = require('../model/productModel');


exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(400).json({ message: "Error adding product", error: err.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    let filter = {};

    if (search)
      filter.productName = { $regex: search, $options: "i" };
    if (category)
      filter.category = { $regex: category, $options: "i" };

    let query = Product.find(filter);

    // Sorting by price or quantity
    if (sort === "price") query = query.sort({ price: 1 });
    else if (sort === "quantity") query = query.sort({ quantity: 1 });

    const products = await query;
    res.json({ message: "Products fetched successfully", products });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};




exports.updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully", updated });
  } catch (err) {
    res.status(400).json({ message: "Error updating product", error: err.message });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

exports.getTotalStockValue = async (req, res) => {
  try {
    const result = await Product.aggregate([
      { $group: { _id: null, totalStockValue: { $sum: { $multiply: ["$price", "$quantity"] } } } }
    ]);
    res.json({ totalStockValue: result[0]?.totalStockValue || 0 });
  } catch (err) {
    res.status(500).json({ message: "Error calculating total stock value", error: err.message });
  }
};


