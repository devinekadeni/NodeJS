const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log('<h1>Hellooo</h1>');
  next();
})
app.get('/', (req, res) => {
  res.send('getting root');
})

app.get('/profile', (req, res) => {
  res.send('getting profile');
})

app.post('/profile', (req, res) => {
  // console.log(req.body.name);
  const user = {
    name: req.body.name,
    hobby: req.body.hobby,
  }
  res.send(user);
})
app.listen(2000);