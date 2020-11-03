const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routers/stuff');
const userRoutes = require('./routers/user');
const path = require('path');


const app = express();
//let url = "mongodb+srv://root:<mi0oQrgjEhbgLcPL>@cluster0.xfwpe.mongodb.net/<products>?retryWrites=true&w=majority";
let url = "mongodb://192.168.1.166:27017/products";
let dbName = 'products';

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex :  true });
let db = mongoose.connection;
db.once('open', _=> {

    console.log('Database connected :', url)
});

db.on('err', err =>{
    console.log('connection error :', err)
});

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
  
module.exports = app;
