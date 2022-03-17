const db = require('../models');
const User = db.users;

exports.verifyEmail = (req, res, next) => {
  const email = req.body.email;
  User.findOne({
    where: {
      email: email,
    },
  }).then((userdata) => {
    if (userdata) {
      res.status(400).send({
        message: 'Email is already in use',
      });
      return;
    }
    next();
  });
};
