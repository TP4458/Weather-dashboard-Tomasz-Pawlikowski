//                       9151489e00d2d58fb7dd317366e92b06

//geocode http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//current https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//5day api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
const apiKey = "9151489e00d2d58fb7dd317366e92b06";


var historyStorage = ("#history");
var city= "";
var dateDispEl = $("#dateDisp")
var cityDispEl = $("#cityDisp")
var tempDispEl = $("#tempDisp")
var humidityDispEl = $("#humDisp")
var pressureDispEl = $("#pressDisp")
var windDispEl = $("#windDisp")
var iconDispEl = $("#icon")
var fiveDayEl = $("#fiveDay")

let saveBtn = $("#search")
let history = []; 





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
        get5Day(longitude, latitude)
        })
}


//get current weather data
function getWeather(longitude, latitude) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&&appid=${apiKey}`
    fetch (requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data){

        //function to convert wind direction in degrees to an arrow credit: https://stackoverflow.com/a/54677081
        let angle = (data.wind.deg)
            function windDirection(angle){
            const directions = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'];
            return directions[Math.round(angle / 45) % 8];
        }
        let degrees = windDirection(angle)

        var icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        
        cityDispEl.text(data.name)
        tempDispEl.text(`Temperature:${data.main.temp}°C`)
        iconDispEl.html(`
            <img src="${icon}">
            `)
        humidityDispEl.text(`Humidity: ${data.main.humidity}%`)
        pressureDispEl.text(`Pressure: ${data.main.pressure}HpA`)
        windDispEl.text(`Wind: ${data.wind.speed}m/s ${degrees}`)

        console.log(data)
    })
}

//get 5 dayforecast
function get5Day(longitude, latitude) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    fetch (requestUrl)
    .then (function(response) {
        return response.json();
    })
    .then (function(data) {
        
        console.log(data)
        for (let i = 0; i<=data.list.length -1; i+=8){
            var icon = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
            console.log(data.list[i].dt_txt)

        fiveDayEl.append(`
            <div class ="fiveDayWrap fiveDayEl">
                <p class = "date">${data.list[i].dt_txt}</p>
                <p class="temp">Temp: ${(data.list[i].main.temp)}°C <img src="${icon}"></p>
                <p class="wind">Wind: ${data.list[i].wind.speed} m/s</p>
                <p class="humid">Humidity: ${data.list[i].main.humidity}%</p>
            </div>
    `)}
            })

    }
 
saveBtn.on("click", function(event) {
    event.preventDefault();

    city = $("#form-search").val();
    if (city === "") {
        return
    }else{
        history.push(city)
        localStorage.setItem("history-saved", JSON.stringify(history));
        
    }
    geoLocate()
    searchHistory()
})

function searchHistory(){
    let searchHistory = localStorage.getItem("history-saved");
    if (searchHistory) {
        history = JSON.parse(searchHistory);
        dispHistory()
    }
}
searchHistory()


function dispHistory(history) {
    for (let i = 0; i < history.length; i++) {
        const pastCity = history[i];
        historyStorage.append($(`<button class="past-city btn" data-city="${pastCity}">`).text(pastCity));

    
    }
}
//    })
    //TODO

        // create form Elements
        //eventlistener
        // create search history element
        //clear history button
        //save to local storage
        //styling of all elements



    


// function timeNow(){
//     var currentTime = dayjs().format("DD-MM-YYYY HH:mm:ss");
//      dateDispEl.text(currentTime);
//     }
//   setInterval(timeNow, 1000)
