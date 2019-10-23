var express = require('express');
var router = express.Router();
let multer = require('multer')
var controller = require("../controller/adminController")
//var mudController = require("../controller/mudfileController")
const DIR = './admin'


let upload = multer({dest: '/upload'});

/* Initial page to upload a mud file*/
router.get('/', function(req, res, next) {
    console.log('request admin page')
    //var list = mudController.mudFileListNoRend(next)
    controller.initial(req,res, next);
    
});

/* Post request for mudFile upload */
router.post('/upload', upload.single('mudFileUpload'),function(req, res, next) {
    if (!req.file) {
        return next(new Error("No file received"));
    }else
        controller.mudFileInsert(req, res)
        //res.send('File successfully updated')
});

router.post('/remove', function(req, res, next) {

        console.log('File to delete ' + req.body.filename)
        controller.deleteByName(req,res)
});


module.exports = router