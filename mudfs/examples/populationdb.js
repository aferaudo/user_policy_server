#! /usr/bin/env node

console.log('This script populates insert some mudfile in your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
let userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}*/

let async = require('async')
let fs = require('fs')
let mudFile = require("../models/mudFileModel")

let mongoose = require("mongoose")
let mongoDB = userArgs[0]
// To remove all the deprecation
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// connect
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log("here")
function mudFileInsert(fileName){
    let json_data = fs.readFileSync(fileName+".json")
    mudFileDetail = {file_name: fileName, source_file: json_data}
    let toInsert = new mudFile(mudFileDetail)

    toInsert.save(function(err, toInsert){
        if(err) throw err;
        console.error('saved file to mongo')
    })
}

function mudFileFind(fileName){
    /*
    async.parallel({
        result: function(callback) {
            mudFile.findOne({'file_name': fileName})
              .exec(callback)
        }, function(err, results) {
            if (err) { return next(err); } // Error in API usage.
            if (results.author==null) { // No results.
                var err = new Error('Author not found');
                err.status = 404;
                return next(err);
            }
        }
    })*/ 
}

function mudFileRemove(id){
    mudFile.findByIdAndDelete({'_id': id},function(err, toInsert){
        if(err) throw err;
        console.error('deleted ' + fileName)
    })
}

db.on('open', function(){
    console.log("connection with mongoose is open")
    mudFileInsert("Luminaire_150")
    //mudFileRemove("Luminaire_150")
   
})
