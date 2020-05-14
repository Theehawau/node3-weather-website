const request = require('request');

const forecast = (long, lat, callback) => {
    const url = 'https://api.darksky.net/forecast/40f115a3bf37b350784d47a2a6ceec85/'+encodeURIComponent(long)+',' +encodeURIComponent(lat)
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to the internet', undefined);        
        } else if(body.error){
            callback(`Bad coordinates${url}, enter another location`, undefined);        
        }else{
            callback(undefined,`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees
                out with ${body.currently.precipProbability}% of rainfall.The high today is 
                ${body.daily.data[0].temperatureHigh}  and the low is ${body.daily.data[0].temperatureLow} `);    
        }
    })
}

module.exports = forecast
