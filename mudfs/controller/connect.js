let mongoose = require("mongoose")
let dotenv = require('dotenv').config()


let mongodb = ""
if(process.env.MONGODB_USER.length === 0 && process.env.MONGODB_PASSWORD.length === 0)
{
    mongodb = "mongodb://" + process.env.MONGODB_LOCATION + "/" + process.env.MONGODB_DB
    console.log(mongodb)
    await mongoose.connect(mongodb,
    {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    })
}else{
    mongodb = "mongodb://" + process.env.MONGODB_USER + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_LOCATION + "/" + process.env.MONGODB_DB 
    await mongoose.connect(mongodb,
    {
        authSource:"admin"
    });
}

// mongoose.connect(mongodb,
//     {
//         authSource:"admin"
//     });
mongoose.Promise = global.Promise
 
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db
