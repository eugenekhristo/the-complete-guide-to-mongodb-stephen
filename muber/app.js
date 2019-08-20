const express = require('express');
require('express-async-errors');
const app = express();

app.use(express.json());
app.use('/api/drivers', require('./routes/drivers'));
app.use(require('./middleware/error'));

module.exports = app;
