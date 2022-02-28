const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.post('/add', orderController.create);

router.get('/:id', orderController.findOne);

router.post('/edit/:id', orderController.update);

router.delete('/delete/:id', orderController.delete);

module.exports = router;
