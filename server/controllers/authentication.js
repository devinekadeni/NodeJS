const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signIn = function(req, res, next) {
  // User has already had their email and password authenticated
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signUp = function(req, res, next) {
  const { email, password } = req.body;

  if(!email || !password) {
    return res.status(422).send({ error: 'Should insert email and password' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if(err) { return next(err); }

    if(existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User({
      email: email,
      password: password
    });
    user.save(err => {
      if(err) { return next(err); }
      res.json({ success: tokenForUser(user) });
    });  //sasving to mongoDB
  });
}