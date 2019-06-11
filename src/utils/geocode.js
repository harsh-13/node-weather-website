const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiaGFyc2htZyIsImEiOiJjandmNGwyN2UwMHMyNDVxcWQ3eXdqdGJpIn0.4Pc9TWijai2OUHAVA-5qKQ&limit=1"

    request( {url, json: true}, (error, { body } = {}) => {
        if (error) {
            return callback('No connection')
        }
        if (body.features.length === 0) {
            return callback('Cant find such locations')
        }
        callback(undefined, {
            latitude:  body.features[0].center[1],
            longitude:  body.features[0].center[0],
            location: body.features[0].place_name
        })
    })
}

module.exports = geocode
