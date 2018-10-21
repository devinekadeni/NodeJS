var mongoose = require('mongoose')

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  }
})

// var newUser = new User({
//   email: "devinekadeni@gmail.com"
// })

// newUser.save().then(res => {
//   console.log('New User created', res)
// })
//   .catch(e => {
//     console.log('Failed creating new user', e)
//   })

  module.exports = {
    User,
  }