const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.post('/add', productController.create);

router.get('/:id', productController.findOne);

router.get('/all', productController.findAll);

router.post('/edit/:id', productController.update);

router.delete('/delete/:id', productController.delete);

module.exports = router;
