var express = require('express');
var router = express.Router();
var fs = require('fs')
const { promisify } = require('util')
let multer = require('multer')
var controller = require("../controller/user_adminController")
//var mudController = require("../controller/mudfileController")
const DIR = './admin'

let unlinkAsync = promisify(fs.unlink)

let upload = multer({dest: './tmp/'});

/* Initial page to upload a mud file*/
router.get('/', function(req, res, next) {
    if(req.session.loggedin){
        var hour = 3600000
        req.session.cookie.expires = new Date(Date.now() + hour)
        console.log('request admin page')
        //var list = mudController.mudFileListNoRend(next)
        controller.initial(req, res, next);
    }else
        res.redirect('/login')
    
});


/* Logout*/
router.get('/logout', function(req, res, next) {
    if(req.session.loggedin){
        req.session.destroy()
        res.redirect('/')
    }else
        res.redirect('/login')
    
});

/* Post request for mudFile upload */
router.post('/upload', upload.single('mudFileUpload'),function(req, res, next) {
    if(req.session.loggedin){
        if (!req.file) {
            return next(new Error("No file received"));
        }else
            controller.mudFileInsert(req, res)
            //res.send('File successfully updated')

            // After that the file has been stored in the db, I can delete it
            unlinkAsync(req.file.path)
    }else
        res.redirect('/login')
});

router.post('/remove', function(req, res, next) {
    if(req.session.loggedin){
        console.log('File to delete ' + req.body.filename)
        controller.deleteByName(req,res)
    }else
        res.redirect('/login')
});


module.exports = router