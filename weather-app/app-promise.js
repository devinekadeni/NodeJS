const yargs = require('yargs')
const axios = require('axios')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true,
    },
  })
  .help()
  .alias('help', 'h')
  .argv

const encodedAddress = encodeURIComponent(argv.address)
var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=${process.env.MAP_REQUEST_API_KEY}&location=${encodedAddress}`

axios.get(geocodeUrl).then(response => {
  if (response.error === true) {
    throw new Error('Unable to find that address')
  }
  const lng = response.data.results[0].locations[0].latLng.lng
  const lat = response.data.results[0].locations[0].latLng.lat
  var weatherUrl = `https://api.darksky.net/forecast/${process.env.FORECAST_API_KEY}/${lat},${lng}`

  console.log(response.data.results[0].providedLocation.location);
  return axios.get(weatherUrl)
}).then(response => {
  const temperature = response.data.currently.temperature
  const apparentTemperature = response.data.currently.apparentTemperature

  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch(e => {
  if (e.message) {
    console.log(e.message)
  }
})
