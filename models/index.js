const dbConfig = require('../dbconfig/db.config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.products = require('./product.model.js')(sequelize, Sequelize);
db.orders = require('./order.model.js')(sequelize, Sequelize);

db.users.hasMany(db.orders, { as: 'orders' });
db.orders.belongsTo(db.users, {
  foreignKey: 'userId',
  as: 'user',
});

db.orders.hasMany(db.products, { as: 'products' });
db.products.belongsTo(db.orders, {
  foreignKey: 'orderId',
  as: 'order',
});

module.exports = db;
