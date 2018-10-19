const expect = require('expect')
const rewire = require('rewire')

var app = rewire('./app')

describe('App', () => {
  var db = {
    saveUser: expect.createSpy()
  }

  app.__set__('db', db)
  it('should call the spy correctly', () => {
    var spy = expect.createSpy()
    // spy()
    // expect(spy).toHaveBeenCalled()
    spy('devin', 25)
    expect(spy).toHaveBeenCalledWith('devin', 25)
  })

  it('should call saveuser with user object', () => {
    var email = 'devin@gmail.com'
    var password = 'devin12345'

    app.handleSignUp(email, password)
    expect(db.saveUser).toHaveBeenCalledWith({ email, password })
  })
})