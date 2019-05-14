const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/a379c1077476d001ec5f19bd7a29b4ba/${latitude},${longitude}?units=si`;
    request({url, json: true }, (error, response) => {
        if (error) {
            callback('Could not connect to weather service', undefined);
        } else if (response.body.error) {
            callback('Unable to find location', undefined);
        } else {
            console.log(response);
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out and there is a ${response.body.currently.precipProbability}% chance of rain. The humidity is ${response.body.currently.humidity}`);
        }

    })
}

module.exports = forecast;