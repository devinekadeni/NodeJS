const Clarifai = require('clarifai');

// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
  apiKey: 'b8689d37845d4c6fad07d65c175bb850'
});

const handleApiCall = (req, res) => {
  // predict the contents of an image by passing in a url
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db, bcrypt) => {
  const { id } = req.body;
  db('users').where('id', id)
  .increment( 'entries', 1 )
  .returning('entries')
    .then(response => {
       res.json(response[0])
    })
    .catch(err => res.status(400).json('unable to entry'))
}



module.exports = {
  handleImage: handleImage,
   handleApiCall: handleApiCall
}