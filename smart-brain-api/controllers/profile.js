const handleProfileGet = (req, res, db, bcrypt) => {
  const { id } = req.params;
  db('users').where('id', id)
    .then(response => {
      if(response.length) {
        res.json(response)
      } else {
        res.status(400).json('no such user')
      }
    })
}

 

  module.exports = {
    handleProfileGet: handleProfileGet
  }