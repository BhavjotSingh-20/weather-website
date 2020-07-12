const request = require('request');
const forecast = (latitude,longitude,callback) => {
    console.log(latitude  + ',,,,' + longitude);
    const url = 'http://api.weatherstack.com/current?access_key=1f9eed51eb18a9e78e449e612d3dee87&query=' + encodeURIComponent(latitude) +  ',' + encodeURIComponent(longitude) 

    request({url:url,json:true}, (error,{body} = {}) => {
        if(error) {
            callback('Unable to load Please Try again')
        // }  else if(response.body.error) {
        //     callback('Please Try again');
        }  else {
            callback(undefined,'the current temperature is ' + body.current.temperature + 'and it feels like' + body.current.feelslike);
        }
    })
};
module.exports = forecast;