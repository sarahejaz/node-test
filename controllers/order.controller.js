const db = require('../models');
const Order = db.orders;
const Product = db.products;
const User = db.users;

exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: 'Empty content' });
  }

  const order = {
    date: req.body.date,
    userId: req.body.userId,
  };

  let createdOrder = { ...order };

  await Order.create(order)
    .then((orderdata) => {
      createdOrder.id = orderdata.id;
      console.log('Order with id=' + orderdata.id + ' created');
      //res.send(orderdata);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Error occurred while creating order',
      });
    });

  const products = req.body.products;
  await products.map((pId) => {
    const p = {
      id: pId,
      orderId: createdOrder.id,
    };
    Product.update(p, {
      where: { id: p.id },
    })
      .then((result) => {
        if (result == 1) {
          console.log(
            'Product with id=' + p.id + 'orderId updated successfully'
          );
        } else {
          console.log('Cannot update orderId of Product with id=' + p.id);
          return;
        }
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            'Error while updating orderId of Products\nError: ' + err.message,
        });
      });
  });

  res.status(201).send({
    message: 'Order created and orderId of Products updated',
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

exports.update = async (req, res) => {
  const id = req.params.id;
  const updateOrder = {
    date: req.body.date,
    userId: req.body.userId,
  };

  await Order.update(updateOrder, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        console.log('Order with id=' + id + 'updated successfully');
      } else {
        return res.status(500).send({
          message: 'Cannot update Order with id=' + id,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: 'Error while updating Order with id=' + id,
      });
    });

  const products = req.body.products;
  if (products) {
    await products.map((pId) => {
      const p = {
        id: pId,
        orderId: id,
      };
      Product.update(p, {
        where: { id: p.id },
      })
        .then((result) => {
          if (result == 1) {
            console.log(
              'Product with id=' + p.id + ' and orderId updated successfully'
            );
          } else {
            console.log('Cannot update orderId of Product with id=' + p.id);
            return;
          }
        })
        .catch((err) => {
          console.log(
            'Error while updating orderId of Products\nError: ' + err.message
          );
          return;
        });
    });
  }

  res.status(200).send({
    message: 'Order updated and orderId of Products updated',
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  let userId;

  Order.findByPk(id)
    .then((order) => {
      userId = order.userId;
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Order not found id=' + id,
      });
    });

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
