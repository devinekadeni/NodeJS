const expect = require('expect')
const request = require('supertest')
const { ObjectID } = require('mongodb')

const { app } = require('../server')
const { Todo } = require('../models/todo')
const { User } = require('../models/user')



describe('POST /todos', () => {
  beforeEach((done) => {
    Todo.remove({}).then(() => done())
  })
  it('should create a new todo', (done) => {
    var text = 'Test todo text'
    request(app)
      .post('/todos')
      .send({
        text
      })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then(todos => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        })
        .catch(e => done(e))
      })
  })

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(0)
          done()
        })
        .catch(e => done(e))
      })
  })
})



describe('POST /user', () => {
  beforeEach((done) => {
    User.remove({}).then(() => done())
  })
  it('should create a new user', (done) => {
    var email = 'devinekadeni@gmail.com'

    request(app)
      .post('/user')
      .send({
        email
      })
      .expect(200)
      .expect(res => {
        expect(res.body.email).toBe(email)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        User.find().then(users => {
          expect(users.length).toBe(1)
          expect(users[0].email).toBe(email)
          done()
        })
        .catch(e => done(e))
      })
  })

  it('should not create user with invalid body data', (done) => {
    request(app)
      .post('/user')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        User.find().then(users => {
          expect(users.length).toBe(0)
          done()
        })
        .catch(e => done(e))
      })
  })
})

describe('GET /todos', () => {
  const todos = [{
    text: 'First test todo'
  }, {
    text: 'Second test todo'
  }]

  beforeEach((done) => {
    Todo.insertMany(todos).then(() => done())
  })

  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.result.length).toBe(2)
        expect(res.body.result[0].text).toBe(todos[0].text)
        expect(res.body.result[1].text).toBe(todos[1].email)
      })
      .end(done())
  })
})

describe('GET /user', () => {
  const users = [{
    email: 'devin@gmail.com'
  }, {
    email: 'ekadeni@gmail.com'
  }]

  beforeEach((done) => {
    User.insertMany(users).then(() => done())
  })

  it('should get all users', (done) => {
    request(app)
      .get('/user')
      .expect(200)
      .expect(res => {
        expect(res.body.result.length).toBe(2)
        expect(res.body.result[0].email).toBe(users[0].email)
        expect(res.body.result[1].email).toBe(users[1].email)
      })
      .end(done())
  })
})

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    const todos = [{
      _id: new ObjectID(),
      text: 'First test todo'
    }, {
      _id: new ObjectID(),
      text: 'Second test todo'
    }]

    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.result.text).toBe(todos[0].text)
      })
      .end(done())
  })

  it('should return 404 if todo not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done())
  })

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/todos/123abc')
      .expect(404)
      .end(done())
  })
})

describe('GET /user/:id', () => {
  it('should return todo doc', (done) => {
    const users = [{
      _id: new ObjectID(),
      email: 'devin@gmail.com'
    }, {
      _id: new ObjectID(),
      email: 'ekadeni@gmail.com'
    }]

    request(app)
      .get(`/user/${users[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.result.text).toBe(users[0].text)
      })
      .end(done())
  })

  it('should return 404 if user not found', (done) => {
    const hexId = new ObjectID().toHexString()
    request(app)
      .get(`/user/${hexId}`)
      .expect(404)
      .end(done())
  })

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/user/123abc')
      .expect(404)
      .end(done())
  })
})