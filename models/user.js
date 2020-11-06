const mongoose = require('mongoose');


let url = "mongodb+srv://root:mi0oQrgjEhbgLcPL@cluster0.xfwpe.mongodb.net/products?retryWrites=true&w=majority";
//let url = "mongodb://192.168.1.166:27017/products";
let dbName = 'products';

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex :  true });
let db = mongoose.connection;
db.once('open', _=> {

    console.log('Database connected :', url)
});

db.on('err', err =>{
    console.log('connection error :', err)
});

const uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique : true },
  password: { type: String, required: true }
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);