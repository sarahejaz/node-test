const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Home page' });
});

const port = process.env.port || 3000;
app.listen(port);
console.log('Server running on port ' + port);
