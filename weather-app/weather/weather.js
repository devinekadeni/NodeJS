const request = require('request')

const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}/${lat},${lng}`,
    json: true,
  }, (error, response, body) => {
    if (error) {

      callback('Unable connect to map request API')
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature,
      })
    }
  })
}

module.exports.getWeather = getWeather