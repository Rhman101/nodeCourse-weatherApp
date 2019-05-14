const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmhtYW4xMDEiLCJhIjoiY2p2Y2N6cW5oMDF5MjN5bzM4OG81cWJvaiJ9.yKYfSUh0PgMLp17gtkGaVA&limit=1`;
    request({ url, json: true}, (error, response) => {
        if (error) {
            callback('Could not access search. Check internet connection.', undefined);
        } if (response.body.error || response.body.features.length == 0) {
            callback('Could not find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].geometry.coordinates[1],
                longitude: response.body.features[0].geometry.coordinates[0],
                location: response.body.features[0].place_name
            })
        }
    })
};

module.exports = geocode;