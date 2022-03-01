const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Main page' });
});

/* ==================================================== USER ==================================================== */
router.post('/signup', (req, res) => {
  res.send({ message: 'Sign in' });
});

router.post('/login', (req, res) => {
  res.send({ message: 'Login' });
});

router.get('/user/:id', (req, res) => {
  res.send({ message: 'User profile' });
});

router.post('/edituser/:id', (req, res) => {
  res.send({ message: 'Updated user' });
});

/* ==================================================== PRODUCT ==================================================== */
router.post('/product/create', (req, res) => {
  res.send({ message: 'Product created' });
});

router.get('/product/:id', (req, res) => {
  res.send({ message: 'Product details' });
});

router.post('/editproduct/:id', (req, res) => {
  res.send({ message: 'Product updated' });
});

router.delete('/deleteproduct/:id', (req, res) => {
  res.send({ message: 'Product deleted' });
});

/* ==================================================== ORDER ==================================================== */
router.post('/order/create', (req, res) => {
  res.send({ message: 'Order created' });
});

router.get('/order/:id', (req, res) => {
  res.send({ message: 'Order details' });
});

router.post('/editorder/:id', (req, res) => {
  res.send({ message: 'Order updated' });
});

router.delete('/deleteorder/:id', (req, res) => {
  res.send({ message: 'Order deleted' });
});
