const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
  res.send({ message: 'Sign in' });
});

router.post('/login', (req, res) => {
  res.send({ message: 'Login' });
});

router.get('/:id', (req, res) => {
  res.send({ message: 'User profile' });
});

router.post('/edit/:id', (req, res) => {
  res.send({ message: 'Updated user' });
});

module.exports = router;
