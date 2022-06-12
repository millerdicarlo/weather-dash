function weatherDash() {
    var inputEl = document.getElementById("city-input");
    var searchEl = document.getElementById("search-button");
    var clearEl = document.getElementById("clear-history");
    var nameEl = document.getElementById("city-name");
    var currentPicEl = document.getElementById("current-pic");
    var currentTempEl = document.getElementById("temperature");
    var currentHumidityEl = document.getElementById("humidity");4
    var currentWindEl = document.getElementById("wind-speed");
    var currentUVEl = document.getElementById("UV-index");
    var historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);


    function getWeather(cityName) {
        //  Using city name, execute get request from open weather map api
                let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
                axios.get(queryURL)
                .then(function(response){
                    console.log(response);
//  Parse: display current conditions
        //  date pull obtained from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
        const currentDate = new Date(response.data.dt*1000);
        console.log(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
        let weatherPic = response.data.weather[0].icon;
        currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
        currentPicEl.setAttribute("alt",response.data.weather[0].description);
        currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
        currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
        currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;
    let UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
    axios.get(UVQueryURL)
    .then(function(response){
        let UVIndex = document.createElement("span");
        UVIndex.setAttribute("class","badge badge-danger");
        UVIndex.innerHTML = response.data[0].value;
        currentUVEl.innerHTML = "UV Index: ";
        currentUVEl.append(UVIndex);
    });



// Event listener and clear
searchEl.addEventListener("click",function() {
    const searchTerm = inputEl.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();
})

clearEl.addEventListener("click",function() {
    searchHistory = [];
    renderSearchHistory();
})


}
weatherDash();