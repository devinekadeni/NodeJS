const request = require('request')

var geocodeAddress = address => {
  return new Promise((resolve, reject) => {
    request({
      url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAP_REQUEST_API_KEY}&location=${address}`,
      json: true,
    }, (error, response, body) => {
      if (error) {
        reject('Unable to connect to Google servers.')
      } else if (body.info.statuscode === 0) {
        resolve({
          Address: body.results[0].providedLocation.location,
          Longitude: body.results[0].locations[0].latLng.lng,
          Latitude: body.results[0].locations[0].latLng.lat,
        })
      }
    }) 
  })
}

geocodeAddress('1946').then(location => {
  console.log(JSON.stringify(location, undefined, 2));
}).catch(console.log)