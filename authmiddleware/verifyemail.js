const db = require('../models');
const User = db.users;

exports.verifyEmail = (req, res) => {
  const email = req.body.email;
  User.findOne({
    where: {
      email: email,
    },
  })
    .then((userdata) => {
      if (userdata) {
        return res.status(500).send({
          message: 'Email is already in use',
        });
      }
    })
    .catch((err) => {
      return res.send({
        message: 'Error: ' + err.message,
      });
    });
};
