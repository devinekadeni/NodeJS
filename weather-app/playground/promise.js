var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b)
      } else {
        reject('Invalid arguments. Expected numbers')
      }
    }, 1500)
  })
}

asyncAdd(5, 9).then((res) => {
  console.log(res)
  return asyncAdd(res, '33')
}).then(res => {
  console.log('Should be 45', res)
}).catch(console.log)

// var somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve('hey. it worked')
//     reject('Unable to fulfill promise')
//   }, 2500)
// })

// somePromise.then((message) => {
//   console.log('Success: ', message)
// }).catch((errorMessage) => {
//   console.log('Error: ', errorMessage)
// })