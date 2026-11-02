const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", function () {
    const city = searchInput.value;
    if(city.trim()=== ""){
alert("Enter a city!");
return;
}
const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city.trim()}&count=1&language=en&format=json`;
    console.log(city);
    fetch(url)
    .then (response => response.json())
    .then(data => {
    console.log(data);

    const location = data.results[0];
    let recentSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    recentSearches = recentSearches.filter(item => item !== location.name);

    recentSearches.unshift(location.name);

    recentSearches = recentSearches.slice(0, 5);

    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    const recentList = document.getElementById("recent-list");

    recentList.innerHTML = "";

    recentSearches.forEach(city => {
    recentList.innerHTML += `
        <button class="recent-city" data-city="${city}">
            ${city}
        </button>
    `;
}); 
    recentList.querySelectorAll(".recent-city").forEach(button => {
    button.addEventListener("click", function () {
        searchInput.value = this.dataset.city;
        searchBtn.click();
    });
});
    console.log(location.latitude);
    console.log(location.longitude);
    document.querySelector("#current-weather h2").textContent = data.results[0].name;
    const latitude = location.latitude;
    const longitude = location.longitude;
    console.log(latitude, longitude);
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&forecast_days=5`;
    fetch(weatherUrl)
    .then(response => response.json())
    .then(weatherData => {
        console.log(weatherData);
        const temperature = weatherData.current.temperature_2m;
        const windSpeed = weatherData.current.wind_speed_10m;

        console.log(temperature);
        console.log(windSpeed);
        document.querySelector("#current-weather p:nth-of-type(1)").textContent =
        `Temperature: ${temperature}°C`;
        document.querySelector("#current-weather p:nth-of-type(2)").textContent =
       `Wind speed: ${windSpeed} km/h`;
        console.log(weatherData.daily);
        const dates = weatherData.daily.time;
        const maxTemps = weatherData.daily.temperature_2m_max;
        const minTemps = weatherData.daily.temperature_2m_min;

        console.log(dates);
        console.log(maxTemps);
        console.log(minTemps);
        const forecastList = document.getElementById("forecast-list");

       forecastList.innerHTML = "";

       dates.forEach((date, index) => {
       forecastList.innerHTML += `
       <div class="forecast-card">
        <h3>${date}</h3>
        <p>Max: ${maxTemps[index]}°C</p>
        <p>Min: ${minTemps[index]}°C</p>
     </div>
`;
});
    });
});
});


