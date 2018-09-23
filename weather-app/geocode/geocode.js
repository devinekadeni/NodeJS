const request = require('request')

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address)

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAP_REQUEST_API_KEY}&location=${encodedAddress}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.')
    } else if (body.info.statuscode === 0) {
      callback(undefined, {
        Address: body.results[0].providedLocation.location,
        Longitude: body.results[0].locations[0].latLng.lng,
        Latitude: body.results[0].locations[0].latLng.lat,
      })
    }
  })  
}

module.exports.geocodeAddress = geocodeAddress
