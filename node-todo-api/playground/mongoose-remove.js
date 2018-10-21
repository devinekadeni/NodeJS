const { ObjectID } = require('mongodb')

const { mongoos } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')
const { User } = require('../server/models/user')

Todo.remove({}).then(res => {
  console.log(res)
})

Todo.findOneAndRemove({ _id: '5bcc87f3a60e60aa0d945f4a' }).then(res => {
  console.log(res)
})

Todo.findByIdAndRemove('5bcc87f3a60e60aa0d945f4a').then(res => {
  console.log(res)
})