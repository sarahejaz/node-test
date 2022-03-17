const express = require('express');
const router = express.Router();
const userController = require('../controllers/userauth.controller');
const verifyEmail = require('../authmiddleware/verifyemail');

router.post('/signup', [verifyEmail.verifyEmail], userController.signup);

router.post('/login', userController.signin);

router.get('/:id', (req, res) => {
  res.send({ message: 'User profile' });
});

router.post('/edit/:id', (req, res) => {
  res.send({ message: 'Updated user' });
});

module.exports = router;
