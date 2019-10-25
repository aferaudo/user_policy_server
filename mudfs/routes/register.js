let express = require('express');
let router = express.Router();
let controller = require('../controller/userController')

router.get('/',function(req, res, next){
    console.log("Requested login page")
    res.render('registration', {title: "Registration Page"})
})
/* Post Request */
router.post('/',function(req, res, next) {
    // console.log(req.body.username)
    // console.log(req.body.password)
    // console.log(req.body.passwordConf)
   
    controller.createNewUser(req,res,next)
});

module.exports = router;