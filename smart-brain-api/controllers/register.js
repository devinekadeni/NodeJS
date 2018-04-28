const handleRegister = (req, res, db, bcrypt) => {
  const hash = bcrypt.hashSync(req.body.password);

    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email:req.body.email,
      })
      .into('login')
      .returning('email')
      .then(email => {
        const reqEmail = email[0]
        db('users')
        .returning('*')
        .insert({
          name: req.body.name,
          email: reqEmail,
          joined: new Date(),
        }).then(response => res.json(response[0]))
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
  }

  module.exports = {
    handleRegister: handleRegister
  }