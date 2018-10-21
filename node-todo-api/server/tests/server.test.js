const expect = require('expect')
const request = require('supertest')

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

const todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}]

describe('GET /todos', () => {
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

const users = [{
  email: 'devin@gmail.com'
}, {
  email: 'ekadeni@gmail.com'
}]

describe('GET /user', () => {
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