const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'b25aa6ec3186e78b4137c4c85fe23816';

$(document).ready(function () {
    weatherFn('Kolkata'); // Initial city

    // Attach click handler once
    $('#city-input-btn').on('click', function () {
        let cityName = $('#city-input').val().trim();
        if (cityName) {
            weatherFn(cityName);
        } else {
            alert("Please enter a city name.");
        }
    });
});

async function weatherFn(cName) {
    const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
    try {
        const res = await fetch(temp);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${Math.round(data.main.temp)}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-info').fadeIn();
    const iconCode = data.weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById('weather-icon').alt = data.weather[0].description;

    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('weather-info').style.display = 'block';
}
