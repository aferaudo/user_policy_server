var express = require('express');
var router = express.Router();
var controller = require("../controller/mudfileController")

/* Rerturn all the mudfiles in the db */
router.get('/', function(req, res, next) {
  // console.log("Looking for all")
  controller.mudFileList(req, res, next)
});

/* GET users listing. */
router.get('/:name', function(req, res, next) {
    let name = req.params.name
    // console.log("Looking for " + name)
    //res.send('respond with this file ' + name);
    controller.mudFileByName(req, res, next)
    
  });


module.exports = router