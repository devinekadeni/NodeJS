// const MongoClient = require('mongodb').MongoClient
const { MongoClient, ObjectID } = require('mongodb')

// const obj = new ObjectID()
// console.log(obj.getTimestamp())

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to mongodb server', err)
  }
  console.log('Connected to mongodb server')
  const db = client.db('TodoApp')

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false,
  // }, (err, res) => {
  //   if (err) {
  //     return console.log('Unable to insert Todos', err)
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2))
  // })

  // db.collection('Users').insertOne({
  //   name: 'Devin',
  //   age: '24',
  //   location: 'Indonesia',
  // }, (err, res) => {
  //   if (err) {
  //     return console.log('Unable to insert Users', err)
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2))
  //   console.log(res.ops[0]._id.getTimestamp())
  // })

  client.close()
})