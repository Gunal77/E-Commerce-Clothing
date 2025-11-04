const Product = require('../models/Product');

async function listProducts(req, res) {
  const { category, gender } = req.query;
  const filter = { isActive: true };
  if (category) filter.category = category;
  if (gender) filter.gender = gender;
  const products = await Product.find(filter).sort({ createdAt: -1 }).limit(100);
  res.json(products);
}

async function getProduct(req, res) {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
}

async function createProduct(req, res) {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function updateProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct };


