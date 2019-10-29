let express = require('express');
let router = express.Router();
let controller = require('../controller/userController')


router.get('/',function(req, res, next){
    if(req.session.loggedin)
        res.redirect('/user_administration'); // to change with the page of the user logged in!
    else 
    {
        console.log("Requested login page")
        res.render('login', {title: "Login Page"})
    }
})
/* Post Request */
router.post('/',function(req, res, next) {
    //console.log(req.body.username)
    //console.log(req.body.password)
    
    
    controller.authUser(req.body.username, req.body.password, function (err, user){
        if (err) {
          return next(err);
        }
        else{
            req.session.loggedin = true;
            req.session.username = req.body.username;
            res.redirect('/user_administration');
        }
    });
});

module.exports = router;