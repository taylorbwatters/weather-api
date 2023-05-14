const apiKey = '7dae557f9c643e0d7d7aa617f65244e4';

function getCurrentWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const { name, dt, weather, main, wind } = data;
            const date = new Date(dt * 1000).toLocaleDateString();
            const icon = weather[0].icon;
            const windSpeed = wind.speed;
            const humidity = main.humidity;
            const temperature = main.temp;

            displayCurrentWeather(name, date, icon, windSpeed, humidity, temperature);
            getFutureWeather(city);  
        })
        .catch(error => {
            console.log('error', error);
        });
}

// TODO: make a function to fetch future weather forcast for city: 

function getFutureWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const forecastData = data.list.slice(0, 5).map(item => {
            const date = new Date(item.dt * 1000).toLocaleDateString();
            const icon = item.weather[0].icon;
            const windSpeed = item.wind.speed;
            const humidity = item.main.humidity;
            const temperature = item.main.temp;

            return { date, icon, windSpeed, humidity, temperature };
        });

        // TODO: display future weather forecast:
        displayFutureWeather(forecastData);
    })
    .catch(error => {
        console.log('error', error);
    });
}


// TODO: make a function to display current weather:

function displayCurrentWeather(name, date, icon, windSpeed, humidity, temperature) {
    const currentWeatherContainer = document.querySelector('#current-weather-container');
    currentWeatherContainer.innerHTML = '';


    const cityDateElement = document.createElement('h2');
    cityDateElement.textContent = '${name} (${date})';


    const iconElement = document.createElement('img');
    iconElement.setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`);
    iconElement.setAttribute('alt', 'weather icon');

    const windElement = document.createElement('p');
    windElement.textContent = `Wind Speed: ${windSpeed} m/s`;

    const humidityElement = document.createElement('p');
    humidityElement.textContent = `Humidity: ${humidity}%`;

    const temperatureElement = document.createElement('p');
    temperatureElement.textContent = `Temperature: ${temperature}`;


    // TODO: append to container:
    currentWeatherContainer.appendChild(cityDateElement);
    currentWeatherContainer.appendChild(iconElement);
    currentWeatherContainer.appendChild(windElement);
    currentWeatherContainer.appendChild(humidityElement);
    currentWeatherContainer.appendChild(temperatureElement);
}


// TODO: make a function to display future weather:

function displayFutureWeather(forecastData) {
    const forecastContainer = document.querySelector('#forecast-container');
    forecastContainer.innerHTML = '';

    forecastData.forEach(item => {
        const { date, icon, windSpeed, humidity, temperature } = item;

        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        const dateElement = document.createElement('p');
        dateElement.textContent = date;

        const iconElement = document.createElement('img');
        iconElement.setAttribute('src', `http://openweathermap.org/img/w/${icon}.png`);
        iconElement.setAttribute('alt', 'Weather Icon');

        const windElement = document.createElement('p');
        windElement.textContent = `Wind Speed: ${windSpeed} m/s`;

        const humidityElement = document.createElement('p');
        humidityElement.textContent = `Humidity: ${humidity}%`;

        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `Temperature: ${temperature}`;


        forecastItem.appendChild(dateElement);
        forecastItem.appendChild(iconElement);
        forecastItem.appendChild(windElement);
        forecastItem.appendChild(humidityElement);
        forecastItem.appendChild(temperatureElement);


        forecastContainer.appendChild(forecastItem);
    });
}


// TODO: function for form 
function handleFormSubmit(event) {
    event.preventDefault();
    const cityInput = document.querySelector('#city-input');
    const city = cityInput.value.trim();

    if (city) {
        getCurrentWeather(city);

        addToSearchHistory(city);

        cityInput.value = '';
    }
}


function addToSearchHistory(city) {
    const searchHistoryContainer = document.querySelector('#search-history-container');

    const cityButton = document.createElement('button');
    cityButton.textContent = city;
    cityButton.classList.add('search-history-item');


    cityButton.addEventListener('click', () => {
        getCurrentWeather(city);
    });

    searchHistoryContainer.appendChild(cityButton);
}

const form = document.querySelector('#weather-form');
form.addEventListener('submit', handleFormSubmit);