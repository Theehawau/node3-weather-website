const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGhlZWhhd2F1IiwiYSI6ImNrN3J4dGZvcjA5aW4zZm4xOHR1c2Z1bTkifQ.Q8LbKmMuvIJ8zF0EqSMeRA'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to internet', undefined);       
        }else if(body.features.length === 0){
            callback('Unable to find specified location', undefined);       
        }else{
            callback(undefined, {
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            });
        }
    })
}


module.exports = geocode