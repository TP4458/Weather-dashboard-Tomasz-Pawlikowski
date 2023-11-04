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
var dateDispEl = $("#dateDisp")
var cityDispEl = $("#cityDisp")
var tempDispEl = $("#tempDisp")
var humidityDispEl = $("#humDisp")
var pressureDispEl = $("#pressDisp")
var windDispEl = $("#windDisp")



//get longitude/latitude
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
}
geoLocate()

//get weather data
function getWeather(longitude, latitude) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&&appid=${apiKey}`
    fetch (requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){

        let degrees = ""
        let angle = (data.wind.deg)
            function windDirection(angle){
            const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
            return directions[Math.round(angle / 45) % 8];
        }
        degrees = windDirection(angle)
        cityDispEl.text(data.name)
        tempDispEl.text("Temperature: " + data.main.temp + "°C")
        humidityDispEl.text("Humidity: " + data.main.humidity + "%")
        pressureDispEl.text("Pressure: " + data.main.pressure + "HpA")
        windDispEl.text("Wind: " + data.wind.speed + degrees)
        console.log(data)
        console.log(degrees)
        


    })
}
// getWeather()

    


// function timeNow(){
//     var currentTime = dayjs().format("DD-MM-YYYY HH:mm:ss");
//      dateDispEl.text(currentTime);
//     }
//   setInterval(timeNow, 1000)
  
