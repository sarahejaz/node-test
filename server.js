const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const productRoutes = require('./routers/product.routes');
const orderRoutes = require('./routers/order.routes');
const userRoutes = require('./routers/user.routes');

app.get('/', (req, res) => {
  res.json({ message: 'Home page' });
});

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

const port = process.env.port || 3000;
app.listen(port);
console.log('Server running on port ' + port);
