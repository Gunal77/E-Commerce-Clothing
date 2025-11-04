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

module.exports = { listProducts, getProduct };


