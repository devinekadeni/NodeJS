const { MongoClient, ObjectID } = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to mongodb server', err)
  }
  console.log('Connected to mongodb server')
  const db = client.db('TodoApp')

  // delete many
  db.collection('Todos').deleteMany({ text: "eat lunch" }).then(docs => {
    console.log(docs)
  })

  // delete one
  db.collection('Todos').deleteOne({ text: "eat lunch" }).then(docs => {
    console.log(docs)
  })

  // find one and delete
  db.collection('Todos').findOneAndDelete({ completed: false }).then(docs => {
    console.log(docs)
  })


  // client.close()
})