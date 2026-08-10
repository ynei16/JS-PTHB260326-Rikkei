const Product = require('../models/Product');

const getProducts = (req, res) => {
    const products = Product.getAll();
    res.status(200).json(products);
};

const createProduct = (req, res) => {
    const newProduct = Product.create(req.body);
    res.status(201).json(newProduct);
};

module.exports = { getProducts, createProduct };