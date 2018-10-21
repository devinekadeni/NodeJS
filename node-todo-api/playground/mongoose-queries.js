const { ObjectID } = require('mongodb')

const { mongoos } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/user')

var id = '5bcc76d0f6770bda09fb539e'

if (!ObjectID.isValid(id)) {
  console.log('ID not valid')
}

// Todo.find({
//   _id: id
// }).then(res => {
//   if (!res) {
//     return console.log('Id not found')
//   }
//   console.log('Todos', res)
// })

// Todo.findOne({
//   _id: id
// }).then(res => {
//   if (!res) {
//     return console.log('Id not found')
//   }
//   console.log('Todo', res)
// })

Todo.findById(id).then(res => {
  if (!res) {
    return console.log('Id not found')
  }
  console.log('Todo by id', res)
})
.catch(e => console.log(e))

var idUser = '5bcc76d0f6770bda09fb53a0'

if (!ObjectID.isValid(idUser)) {
  console.log('User ID not valid')
}

User.findById(idUser).then(res => {
  if (!res) {
    return console.log('Id User not found')
  }
  console.log('User by id', JSON.stringify(res, undefined, 2))
})
.catch(e => console.log(e))