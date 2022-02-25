module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('product', {
    name: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
    },
    description: {
      type: Sequelize.STRING,
    },
  });
  return Product;
};
