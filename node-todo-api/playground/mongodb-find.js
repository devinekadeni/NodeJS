const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to mongodb server', err)
  }
  console.log('Connected to mongodb server')
  const db = client.db('TodoApp')

  // db.collection('Todos').find({
  //   _id: ObjectID("5bc9838f0db3fb0b809b53e4"),
  // }).toArray().then((docs) => {
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, err => {
  //   console.log('Unable to fetch Todos', err)
  // })  

  db.collection('Users').find({
    name: 'Devin',
  }).toArray().then(docs => {
    console.log(JSON.stringify(docs, undefined, 2))
  }, err => {
    console.log('Unable to connect Users', err)
  })

  client.close()
})