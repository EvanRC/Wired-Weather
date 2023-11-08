var APIKey = "8abd961d0015a3cb9fcb6f613530c1d4" //openweather api key

//global variables declared
var city = "";

var citySearch = document.querySelector("#citySearch");
var searchButton = document.querySelector("#searchButton");
var clearButton = document.querySelector("#clearButton");
var cityName = document.querySelector("cityName");
var currentTemperature = document.querySelector("temperature");
var currentWindSpeed = document.querySelector("windspeed");
var currentHumidity = document.querySelector("#humidity");

//retrieved stored cities from the locl stroage
var storedCities = localStorage.getItem("Cities");
var sCity = storedCities  ? JSON.parse(storedCities) : [];

//event listener added for the search button
searchButton.addEventListener("click", function () {
    //removes cities from local storage
    localStorage.removeItem("Cities");

    //clears the cities list 
    var cityList = document.querySelector(".cityList");
    cityList.innerHTML = "";
});

//Funciton to get weather data from the open weather api
function getWeatherData(city) {
    var quearyURL = 
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey + "&units=imperial";
    console.log(quearyURL)
    //API request using the fetch()
    fetch(quearyURL)
    .then(function (response) {
        if(response.ok) {
            return response.json();
        } else {
            throw new error("Error: " + response.status);
        }
    })
    .then(function (data) {
        console.log(data)
        //retrieves the desired weather info from openweather
        var temperature = data.main.temp;
        var windSpeed = data.wind.speed;
        var windSpeed = data.main.humitdity;

        //creates dynamic html elements 
        cityName.innerText = data.name;
        currentTemperature.innerText = `${temperature} \u00B0F`;
        currentWindSpeed.innerText = `${windSpeed} mph`;
        currentHumidity.innerText = `${humidity}%`;
        document.getElementById("tempIcon").setAttribute("src",
         `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    })
    .catch(function (error) {
        //handle error case
        console.log ("error: " + error.message);
    });
}

function getFiveDayWeatherData(city) {
    var quearyURL =  "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey + "&units=imperial";
    console.log(quearyURL)
    //API request using fetch()
    fetch
}

var sCity = [];

//function created for city search
function searchCity() {
    var storedCities = localStorage.getItem("Cities");
    sCity = storedCities ? JSON.parse(storedCities) : [];

    var city = citySearch.value;
    getWeatherData(city);
    getFiveDayWeatherData(city);

    //then stores searched city into local storage
    sCity.push(city);
    localStorage.setItem("Cities", JSON.stringify(sCity));

    citySearch.value = '';
    renderPreviousSearch();
}