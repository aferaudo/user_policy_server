var express = require('express');
var router = express.Router();
var controller = require("../controller/mudfileController")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Insert also a name!');
});

/* GET users listing. */
router.get('/:name', function(req, res, next) {
    let name = req.params.name
    if(name === 'all'){
      console.log("Looking for all")
      controller.mudFileList(req, res, next)
    }else{
      console.log("Looking for " + name)
      //res.send('respond with this file ' + name);
      controller.mudFileByName(req, res, next)
    }

   
  });

router.get('/all', function(req, res, next) {
    console.log("Looking for all")
    controller.mudFileList(req, res, next)
    //res.send("Nothing")
});

module.exports = router