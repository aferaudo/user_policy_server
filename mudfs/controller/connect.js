let mongoose = require("mongoose")
let dotenv = require('dotenv').config()


let mongodb = process.env.MONGODB_URI
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
mongoose.connect(mongodb);
mongoose.Promise = global.Promise
 
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db
