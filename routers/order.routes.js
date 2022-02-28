const express = require('express');
const router = express.Router();

router.post('/add', (req, res) => {
  res.send({ message: 'Order created' });
});

router.get('/:id', (req, res) => {
  res.send({ message: 'Order details' });
});

router.post('/edit/:id', (req, res) => {
  res.send({ message: 'Order updated' });
});

router.delete('/delete/:id', (req, res) => {
  res.send({ message: 'Order deleted' });
});

module.exports = router;
