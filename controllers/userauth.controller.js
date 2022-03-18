const db = require('../models');
const User = db.users;
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.signup = (req, res) => {
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  })
    .then((userdata) => {
      if (userdata) {
        return res.status(201).send({
          message: 'User created',
        });
      }
      return res.status(500).send({
        message: 'Error occurred while creating user',
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }

      var validPassword = bcrypt.compareSync(req.body.password, user.password);
      if (!validPassword) {
        return res.status(401).send({
          message: 'Invalid password',
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        message: 'User signed in',
        email: user.email,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
