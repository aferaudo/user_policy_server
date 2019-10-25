var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  }
});

//hashing a password before saving it to the database
UserSchema.pre('save', async function (next) {
  var user = this;
  
  const salt = await bcrypt.genSalt()
  bcrypt.hash(user.password, salt, function (err, hash){
    if (err) {
      return next(err);
    }
    console.log(salt)
    console.log(hash)
    user.password = hash;
    next();
  })
  
});


module.exports = mongoose.model('User', UserSchema);