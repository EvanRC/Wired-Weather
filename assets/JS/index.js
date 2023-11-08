var APIKey = "8abd961d0015a3cb9fcb6f613530c1d4" //openweather api key

//global variables declared
var city = "";

var citySearch = document.querySelector("#citySearch");
var searchButton = document.querySelector("#searchButton");
var clearButton = document.querySelector("#clearButton");
var cityName = document.querySelector("#cityName");
var currentTemperature = document.querySelector("#temperature");
var currentWindSpeed = document.querySelector("#windSpeed");
var currentHumidity = document.querySelector("#humidity");

//retrieved stored cities from the locl stroage
var storedCities = localStorage.getItem("Cities");
var sCity = storedCities ? JSON.parse(storedCities) : [];

//event listener added for the search button
searchButton.addEventListener('click', searchCity);

clearButton.addEventListener("click", function () {
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
            if (response.ok) {
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
            var humidity = data.main.humidity;

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
            console.log("error: " + error.message);
        });
}

function getFiveDayWeatherData(city) {
    var quearyURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&appid=" +
        APIKey + "&units=imperial";
    console.log(quearyURL)
    //API request using fetch()
    fetch(quearyURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Error: " + response.status);
            }
        })

        .then(function (data) {
            console.log(data);
            var htmlForecastCards = `<div class='row'>`;
            for (let i = 0; i < data.list.length; i = i + 8) {
                htmlForecastCards += `
            <div class="col-sm-2 forecast">
            <p>${dayjs(data.list[i].dt_txt).format('MM/DD/YYYY')}</p>
            <p></p>
            <p>Temperature: <span>${data.list[i].main.temp} \u00B0F </span>
            <img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png">
            </p>
            <p>Wind Speed: <span class="windSpeed">${data.list[i].wind.speed}mph</span></p>
            <p>Humidity: <span>${data.list[i].main.humidity}%</span></p>
            </div>`;

            }
            htmlForecastCards += `</div>`;
            document.getElementById("futureForecast").innerHTML = htmlForecastCards;
        })

        .catch(function(error) {
            //handles error response
            console.log("error: " + error.message);
        })
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

//retrieves and displays stored cities from local storage
function renderPreviousSearch() {
    //retries the cities stored in local storage
    var storedCities = localStorage.getItem('Cities');
    var sCity = storedCities ? JSON.parse(storedCities) : [];

    //lets get the cityList element
    var cityList = document.querySelector(".cityList");

    //clears content that is maybe already in the city list
    cityList.innerHTML = "";

    //adds each city to the list
    sCity.forEach(function (City) {
        var button = document.createElement("button");
        button.innerText = City;
        button.classList.add("cityButton");
        cityList.appendChild(button);

        //attatch event listener to the button
        button.addEventListener('click', function () {
            getWeatherData(City);
            getFiveDayWeatherData(City);
        });

    });

    if(sCity.length > 0) {
        var lastSearchedCity = sCity[sCity.length - 1];
        getWeatherData(lastSearchedCity);
        getFiveDayWeatherData(lastSearchedCity);
    }
}

renderPreviousSearch(); 