#! /usr/bin/env node

console.log('This script populates a mongo db with jsonfiles. E.g.: node populatedb.js mongodb://localhost/mudFile <mudfile directory>');

// Get arguments passed on command line
if (process.argv.length !== 4) {
    console.log('ERROR: Expected at least 2 arguments (mongo url and json file directory)');
    process.exit(-1)
}

let async = require('async')
let fs = require('fs')
let mudFile = require("../models/mudFileModel")

let mongoose = require("mongoose")
let mongoDB = process.argv.slice(2)[0]
let directory = process.argv.slice(3)[0]


mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Insert a file with a specific name in the directory
function mudFileInsertByFileName(fileName){
    let json_data = fs.readFileSync(fileName+".json")
    mudFileDetail = {file_name: fileName, source_file: json_data}
    let toInsert = new mudFile(mudFileDetail)

    toInsert.save().then(function(toInsert){
        console.log('saved file to mongo')
    })
    .catch(function(err){
        throw err
    })
}


// Insert all the files present in the specified directory
async function mudFileInsertByDirectory(directory){
    var files = fs.readdirSync(directory)
    for (const file of files) {
        if (file.endsWith('.json')) {
            let json_data = fs.readFileSync(directory + file);
            mudFileDetail = { file_name: file.substring(0, file.length - 5), source_file: json_data };
            let toInsert = new mudFile(mudFileDetail);
            await toInsert.save().then(function (toInsert) {
                console.log('saved file to mongo');
            }).catch(function (err) {
                throw err;
            });
        }
    }
    
}

function mudFileRemove(id){
    mudFile.findByIdAndDelete({'_id': id},function(err, toInsert){
        if(err) throw err;
        console.error('deleted ' + fileName)
    })
}

db.on('open', function(){
    console.log("connection with mongoose is open")
    //mudFileInsertByFileName('Luminaire_150Testing') 
    mudFileInsertByDirectory(directory).then(function()
    {
        process.exit(1)
    })
    .catch(function(err){
        throw err
    })


})
