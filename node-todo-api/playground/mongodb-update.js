const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to mongodb server', err)
  }
  console.log('Connected to mongodb server')
  const db = client.db('TodoApp')

  // db.collection('Todos').findOneAndUpdate({
  //   text: "eat lunch"
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then(res => {
  //   console.log(res)
  // })

  db.collection('Users').findOneAndUpdate({
    name: 'Eka'
  }, {
    $set: {
      name: 'Devin Ekadeni'
    },
    $inc: {
      age: 1,
    }
  }, {
    returnOriginal: false
  }).then(res => {
    console.log(res)
  })

  // client.close()
})