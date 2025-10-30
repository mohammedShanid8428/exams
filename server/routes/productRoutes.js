const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

router.post('/product', productController.createProduct);
router.get('/product', productController.getAllProducts);
router.put('/product/:id', productController.updateProduct);
router.delete('/product/:id', productController.deleteProduct);
router.get('/product/total', productController.getTotalStockValue);

module.exports = router;


