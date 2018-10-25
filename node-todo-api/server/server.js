require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./models/todo')
var { User } = require('./models/user')

var app = express()
const port = process.env.PORT

app.use(bodyParser.json())

/* TODOS API */
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
    return res.status(404).send('Invalid ID')
  }
  Todo.findById(todoId).then(result => {
    res.send({result})
  })
  .catch(e => res.status(400).send(e))
})

app.delete('/todos/:id', (req, res) => {
  var todoId = req.params.id

  if (!ObjectID.isValid(todoId)) {
    return res.status(404).send('Invalid ID')
  }

  Todo.findByIdAndRemove(todoId).then(result => {
    if (!result) {
      return res.status(404).send('Todo not exist')
    }
    res.send({ result })
  })
  .catch(e => res.status(400).send(e))
})

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id
  var body = _.pick(req.body, ['text', 'completed'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Invalid ID')
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then(result => {
      if (!result) {
        return res.status(404).send('Id is not exist')
      }
      res.send({ result })
    })
    .catch(e => res.status(400).send(e))
})

/* USERS API */
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password'])
  var user = new User(body)

  user.save().then(() => {
    // res.send(result)
    return user.generateAuthToken()
  })
  .then(token => {
    res.header('x-auth', token).send(user)
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

app.get('/user/:id', (req, res) => {
  var userId = req.params.id
  if (!ObjectID.isValid(userId)) {
    return res.status(404).send('Invalid ID')
  }
  User.findById(userId).then(result => {
    res.send({ result })
  })
    .catch(e => res.status(400).send(e))
})

app.delete('/user/:id', (req, res) => {
  var userId = req.params.id

  if (!ObjectID.isValid(userId)) {
    return res.status(404).send('Invalid ID')
  }

  User.findByIdAndRemove(userId).then(result => {
    if (!result) {
      return res.status(404).send('User not exist')
    }
    res.send({ result })
  })
    .catch(e => res.status(400).send(e))
})

app.patch('/user/:id', (req, res) => {
  var id = req.params.id
  var body = _.pick(req.body, ['email'])

  if (!ObjectID.isValid(id)) {
    return res.status(404).send('Invalid ID')
  }

  User.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(result => {
      if (!result) {
        return res.status(404).send('Id is not exist')
      }
      res.send({ result })
    })
    .catch(e => res.status(400).send(e))
})


app.listen(port, () => {
  console.log(`Started up at port ${port}`)
})

module.exports = { app }