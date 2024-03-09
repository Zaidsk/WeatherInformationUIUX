var apiKey = 'd6322fb075233a996d7ef1e870c281e7'; // Your OpenWeather API key
var unit = 'metric'; // Default unit is Celsius

function getWeather() {
    var location = document.getElementById('locationInput').value;
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=${unit}`;

    // Show loading indicator
    document.querySelector('.loading').style.display = 'block';
    document.getElementById('errorMessage').innerHTML = ''; // Clear previous error message

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                displayError(data.message);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError('An error occurred. Please try again later.');
        })
        .finally(() => {
            // Hide loading indicator
            document.querySelector('.loading').style.display = 'none';
        });
}

function displayWeather(data) {
    var weatherInfo = document.getElementById('weatherInfo');
    var temperature = data.main.temp;
    var description = data.weather[0].description;
    var icon = data.weather[0].icon;
    var weatherIconUrl = `http://openweathermap.org/img/wn/${icon}.png`;

    weatherInfo.innerHTML = `
        <img src="${weatherIconUrl}" alt="Weather Icon">
        <p>Temperature: ${temperature}°${getUnit()}</p>
        <p>Description: ${description}</p>
    `;
}

function displayError(message) {
    var errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = message;
}

function clearWeather() {
    document.getElementById('locationInput').value = '';
    document.getElementById('weatherInfo').innerHTML = '';
    document.getElementById('errorMessage').innerHTML = '';
}

function toggleUnit() {
    unit = unit === 'metric' ? 'imperial' : 'metric';
    // Re-fetch weather data with updated unit
    getWeather();
}

function getUnit() {
    return unit === 'metric' ? 'C' : 'F';
}
