const db = require('../models');
const Product = db.products;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Empty content' });
  }

  const product = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };

  Product.create(product)
    .then((proddata) => {
      res.send(proddata);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occurred while creating product',
      });
    });
};

exports.findAll = (req, res) => {
  Product.findAll()
    .then((proddata) => {
      res.send(proddata);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occurred while retrieving products',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Product.findByPk(id)
    .then((proddata) => {
      if (proddata) {
        res.send(proddata);
      } else {
        res.status(404).send({
          message: `Product with id=${id} cannot be found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Product with id=' + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const updateProd = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };

  Product.update(updateProd, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: 'Product was updated successfully',
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Product with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: 'Product deleted successfully',
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error deleting Product with id=' + id,
      });
    });
};
