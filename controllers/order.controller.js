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
      //res.send(orderdata);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || 'Error occurred while creating order',
      });
    });

  const products = req.body.products;
  products.map((pId) => {
    const p = {
      id: pId,
      orderId: createdOrder.id,
    };
    Product.update(p, {
      where: { id: p.id },
    })
      .then((result) => {
        if (result == 1) {
          res.send({
            message: 'Product orderId updated successfully',
          });
        } else {
          return res.send({
            message: 'Cannot update orderId of Product with id=' + p.id,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            'Error while updating orderId of Product with product id=' + p.id,
        });
      });
  });

  //   products.map((p) => {
  //     p.orderId = createdOrder.id;
  //     Order.findByPk(id)
  //       .then((orderdata) => {
  //         if (orderdata) {
  //           res.send(orderdata);
  //         } else {
  //           res.status(404).send({
  //             message: `Order with id=${id} cannot be found`,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         res.status(500).send({
  //           message: 'Error retrieving Order with id=' + id,
  //         });
  //       });
  //     Product.findByPk(id).then((proddata) => {
  //       if (proddata) {
  //       }
  //     });
  //   });

  User.findByPk(req.body.userId)
    .then((userdata) => {
      if (userdata) {
        // add orderid
        if ('orders' in userdata) {
          let orders = userdata.orders;
          orders.push(createdOrder.id);
        } else {
          userdata.orders = [];
          userdata.orders.push(createdOrder.id);
        }
        userdata.save();
      } else {
        res.status(404).send({
          message: `User with id=${req.body.userId} cannot be found`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving User with id=' + req.body.userId,
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

exports.update = async (req, res) => {
  const id = req.params.id;
  const updateOrder = {
    date: req.body.date,
    userId: req.body.userId,
  };

  //   Order.update(updateOrder, {
  //     where: { id: id },
  //   })
  //     .then((result) => {
  //       if (result == 1) {
  //         res.send({
  //           message: 'Order was updated successfully',
  //         });
  //       } else {
  //         res.send({
  //           message: 'Cannot update Order with id=' + id,
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).send({
  //         message: 'Error updating Order with id=' + id,
  //       });
  //     });

  let differentUser = false;
  let oldUserId;
  // await Order.findByPk(id)
  //   .then((olddata) => {
  //     if (olddata.userId != req.body.userId) {
  //       // add Order to User
  //       differentUser = true;
  //       oldUserId = olddata.userId;
  //     }
  //     Order.update(updateOrder);
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       message: 'Error updating Order with id=' + id,
  //     });
  //   });

  await Order.update(updateOrder, {
    where: { id: id },
  })
    .then((result) => {
      if (result == 1) {
        console.log('Order updated successfully');
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

  if (differentUser) {
    User.findByPk(req.body.userId)
      .then((userdata) => {
        if (userdata) {
          // add orderid
          if ('orders' in userdata) {
            let orders = userdata.orders;
            orders.push(createdOrder.id);
            userdata.orders = orders;
          } else {
            userdata.orders = [];
            userdata.orders.push(createdOrder.id);
          }
          userdata.save();
        } else {
          res.status(404).send({
            message: `User with id=${req.body.userId} cannot be found`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error retrieving User with id=' + req.body.userId,
        });
      });

    // removeOrderFromUser(oldUserId, id);
  }

  const products = req.body.products;
  products.map((pId) => {
    const p = {
      id: pId,
      orderId: createdOrder.id,
    };
    Product.update(p, {
      where: { id: p.id },
    })
      .then((result) => {
        if (result == 1) {
          res.send({
            message: 'Product orderId updated successfully',
          });
        } else {
          return res.send({
            message: 'Cannot update orderId of Product with id=' + p.id,
          });
        }
      })
      .catch((err) => {
        return res.status(500).send({
          message:
            'Error while updating orderId of Product with product id=' + p.id,
        });
      });
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

  // removeOrderFromUser(userId, id);
};
