const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

/* Define our model */
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

/* On Save Hook, encrypt password */
userSchema.pre('save', function(next) { //before save, run callback
  const user = this;  //get access to the user model

  bcrypt.genSalt(10, function(err, salt) {  // generate a salt then run callback
    if(err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {  //hash passwrd by salt
      if(err) { return next(err); }

      user.password = hash; //overwrite plain text password with encrypted password
      next();
    })
  })
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err) { return callback(err); }

    callback(null, isMatch);
  })
}

/* Create the model class */
const ModelClass = mongoose.model('user', userSchema);

/* Export the model */
module.exports = ModelClass;