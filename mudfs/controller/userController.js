
let User = require("../models/userModel")
let bcrypt = require("bcrypt")

/* Create a new User*/
exports.createNewUser = function(req, res, next){
    if (req.body.username &&
        req.body.password &&
        req.body.passwordConf) {
        var userData = {
          username: req.body.username,
          password: req.body.password,
        }
        //use schema.create to insert data into the db
        User.create(userData).then(function (user) {
            return res.redirect('/login');
        })
        .catch(function(err)
        {
            res.render('registration', {title: "Registration Page", errorMessage:'Registration failed. Please retry!'})
        })
    }
}

/* Authenticate user */
exports.authUser = function(user, password, callback){
    User.findOne({ username: user }).then(function (user) {
        if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                return callback(null, user);
            } else {
                return callback();
            }
        })
    })
    .catch(function(err)
    {
        return callback(err)
    })
}