const https = require('https');
module.exports.getWeather = getWeather;
const apiKey = require('./api.json');

function getMessage(cityName, temp) {
    console.log(`The temperature in ${cityName} is ${temp}`);
}

function printError(err) {
    console.error(err.message);
}

function getWeather(cityName) {
    try {
        https.get(`https://api.openweathermap.org/data/2.5/weathe?q=${cityName}&appid=${apiKey.key}`, (res) => {
            if (res.statusCode === 200) {
                res.on('data', (d) => {
                    const json = JSON.parse(d);
                    getMessage(json.name, json.main.temp);
                });
            } else {
                printError(new Error("Server Error!!, Please try after sometime."));
            }
        }).on('error', (e) => {
            printError(e);
        });
    } catch (err) {
        printError(err);
    }
}