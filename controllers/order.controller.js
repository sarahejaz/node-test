const db = require('../models');
const Order = db.orders;
const Product = db.products;

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Empty content' });
  }

  const order = {
    date: req.body.date,
    userId: req.body.userId,
  };

  let createdOrder = { ...order };

  Order.create(order)
    .then((orderdata) => {
      createdOrder.id = orderdata.id;
      res.send(orderdata);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occurred while creating order',
      });
    });

  const products = req.body.products;
  products.map((p) => {
    p.orderId = createdOrder.id;
    Product.update(p, {
      where: { id: p.id },
    })
      .then((result) => {
        if (result == 1) {
          res.send({
            message: 'Product orderId updated successfully',
          });
        } else {
          res.send({
            message: 'Cannot update orderId of Product with id=' + id,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            'Error while updating orderId of Product with product id=' + id,
        });
      });
  });
};

exports.findAll = (req, res) => {
  Order.findAll()
    .then((orderdata) => {
      res.send(orderdata);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Error occurred while retrieving all Orders',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Order.findByPk(id)
    .then((orderdata) => {
      if (orderdata) {
        res.send(orderdata);
      } else {
        res.status(404).send({
          message: `Order with id=${id} cannot be found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Order with id=' + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const updateOrder = {
    date: req.body.date,
    userId: req.body.userId,
  };

  Order.update(updateOrder, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: 'Order was updated successfully',
        });
      } else {
        res.send({
          message: 'Cannot update Order with id=' + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Order with id=' + id,
      });
    });

  const products = req.body.products;
  products.map((p) => {
    p.orderId = id;
    Product.update(p, {
      where: { id: p.id },
    })
      .then((result) => {
        if (result == 1) {
          res.send({
            message: 'Product orderId updated successfully',
          });
        } else {
          res.send({
            message: 'Cannot update orderId of Product with id=' + id,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            'Error while updating orderId of Product with product id=' + id,
        });
      });
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        res.send({
          message: 'Order deleted successfully',
        });
      } else {
        res.send({
          message: 'Cannot delete Order with id=' + id,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error deleting Order with id=' + id,
      });
    });
};
