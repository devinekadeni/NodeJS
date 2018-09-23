const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

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

geocode.geocodeAddress(argv.address, (errorMessage, location) => {
  if (errorMessage) {
    console.log(errorMessage)
  } else {
    weather.getWeather(location.Latitude, location.Longitude, (errorMessage, weather) => {
      if (errorMessage) {
        console.log(errorMessage)
      } else {
        console.log(`${location.Address}\nIt's currently ${weather.temperature}. It feels like ${weather.apparentTemperature}`)
      }
    })
  }
})


  