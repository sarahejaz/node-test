module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('order', {
    date: {
      type: Sequelize.DATE,
    },
  });
  return Order;
};
