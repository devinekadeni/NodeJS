const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const profile = require('./controllers/profile');
const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const image = require('./controllers/image');

/* DB CONFIGURATION */
const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl : true
  }
});

// db.select('*').from('users')
//   .then(data => {
//     console.log(data);
//   })

  /* EXPRESS CONFIGURATION */
const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'John@gmail.com',
      password: 'secret',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'Sally@gmail.com',
      password: 'secret',
      entries: 0,
      joined: new Date()
    },
  ]
}

/* ROOT */
app.get('/', (req, res) => {
  // db('users')
  // .then(data => {
  //   res.json(data)
  // })
  res.send('it is working');
})

/* SIGN IN */
app.post('/signIn', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt)})

/* REGISTER */
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

/* PROFILE */
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db, bcrypt) })

/* IMAGE */
app.put('/image', (req, res) => { image.handleImage( req, res, db, bcrypt)})
app.post('/imageUrl', (req, res) => { image.handleApiCall( req, res)})

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT}`);
});
