var mongoose = require('mongoose')

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,          // remove space
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Number,
    default: null,
  }
})

// var newTodo = new Todo({
//   text: 'Cook dinner',
//   completed: false,
//   completedAt: 213123
// })

// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc)
// }).catch((e) => {
//   console.log('Unable to save todo')
// })

// var otherTodo = new Todo({
//   text: '  Cook dinner ',
// })

// otherTodo.save().then((doc) => {
//   console.log('Saved todo', doc)
// }).catch((e) => {
//   console.log('Unable to save todo')
// })

module.exports = {
  Todo,
}