const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/45a75d1c3913cd5b9228c73de7322cc4/'+latitude+','+longitude+'?units=si'

    request( { url, json: true}, ( error , { body } = {} ) => {
    //const data = JSON.parse(response.body) or json: true
    if (error) {
        return callback('Unable to connect to Weather servers')
    }
    if (body.error) {
        return callback('Invalid location coordinates')
    }
    callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.daily.data[0].precipProbability*100 + '% chance of rain today.')    
})
}
module.exports = forecast