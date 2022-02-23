const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
  res.send({ message: 'Product created' });
});

router.get('/:id', (req, res) => {
  res.send({ message: 'Product details' });
});

router.post('/edit/:id', (req, res) => {
  res.send({ message: 'Product updated' });
});

router.delete('/delete/:id', (req, res) => {
  res.send({ message: 'Product deleted' });
});

module.exports = router;
