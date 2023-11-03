//                       9151489e00d2d58fb7dd317366e92b06

//geocode http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//current https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//5day api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const apiKey = "9151489e00d2d58fb7dd317366e92b06";
var forecast;
var fiveDay;
var history;
var historyStorage;
var city = "London"

function geoLocate() {

    let requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
                longitude = data[0].lon,
                latitude = data[0].lat
        getWeather(longitude, latitude)
        })
    // getWeather(longitude, latitude)
    
}
geoLocate()

function getWeather(longitude, latitude) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
    fetch (requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data)
    })
    console.log(longitude)
}
// getWeather()
