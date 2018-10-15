const expect = require('expect')

const utils = require('./utils')

it('should add two numbers', () => {
  var res = utils.add(33, 11)
  
  expect(res).toBe(44).toBeA('number')
})

it('should square a number', () => {
  var res = utils.square(3)
  
  expect(res).toBe(9).toBeA('number')
})

it('should verify first and last names are set', () => {
  var user = {location: 'BSD', age: 24}
  var res = utils.setName(user, 'Devin Ekadeni')

  expect(user).toInclude({
    firstName: 'Devin',
    lastName: 'Ekadeni',
  })
})

it('should expect some values', () => {
  // expect(12).toNotBe(11)
  // expect({name: 'Andrew'}).toEqual({name: 'Andrew'})
  // expect([1,2,3,4]).toExclude(5)
  // expect([1, 2, 3, 4]).toInclude(4)
  expect({
    name: 'Andrew',
    age: 25,
    location: 'Philadelphia'
  }).toInclude({
    age: 25
  })
})
