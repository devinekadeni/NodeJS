var express = require('express')
var bodyParser = require('body-parser')
var { ObjectID } = require('mongodb')

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

var app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })

  todo.save().then(result => {
    res.send(result)
  })
  .catch(e => {
    res.status(400).send(e)
  })
})

app.get('/todos', (req, res) => {
  Todo.find().then(result => {
    res.send({result})
  })
  .catch(e => res.status(400).send(e))
})

app.get('/todos/:id', (req, res) => {
  var todoId = req.params.id
  if (!ObjectID.isValid(todoId)) {
    res.status(404).send('Invalid ID')
  }
  Todo.findById(todoId).then(result => {
    res.send({result})
  })
  .catch(e => res.status(400).send(e))
})

app.post('/user', (req, res) => {
  var user = new User({
    email: req.body.email
  })

  user.save().then(result => {
    res.send(result)
  })
  .catch(e => {
    res.status(400).send(e)
  })
})

app.get('/user', (req, res) => {
  User.find().then(result => {
    res.send({ result })
  })
    .catch(e => res.status(400).send(e))
})

app.listen(3000, () => {
  console.log('Started on port 3000')
})

module.exports = { app }