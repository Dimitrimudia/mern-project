const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const stuffRoutes = require('./routers/stuff');
const userRoutes = require('./routers/user');
const path = require('path');


const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
  
module.exports = app;
