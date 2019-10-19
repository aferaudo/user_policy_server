var express = require('express');
var router = express.Router();
let multer = require('multer')
let path = require('path')
let fs = require('fs')
var controller = require("../controller/insertController")
const DIR = './admin'


let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, DIR);
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({dest: '/upload'});

/* Initial page to upload a mud file*/
router.get('/', function(req, res, next) {
    console.log('request admin page')
    res.render('admin', { title: 'Admin' });
});

/* Post request for mudFile upload */
router.post('/upload', upload.single('mudFileUpload'),function(req, res, next) {
    if (!req.file) {
        return next(new Error("No file received"));
    }else
        controller.mudFileInsert(req, res)
        //res.send('File successfully updated')
  });


module.exports = router