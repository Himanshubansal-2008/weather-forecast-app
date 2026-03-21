const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');

if (getWeatherBtn && cityInput) {
    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            localStorage.setItem('selectedCity', city);
            window.location.href = 'main/main.html';
        } else {
            alert('Please enter a city name');
        }
    });

    cityInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getWeatherBtn.click();
        }
    });
}

const API_KEY = "f3188f829aa42f403b92b00b0b798e12";

async function fetchWeather() {
    const city = localStorage.getItem('selectedCity');
    if (!city) return;

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        
        if (data.cod === 200) {
            const cityEl = document.getElementById('city');
            const timeEl = document.getElementById('time');
            const tempEl = document.getElementById('temp');
            const description = document.getElementById('description');

            if (cityEl) cityEl.textContent = `${data.name}, ${data.sys.country}`;
            if (tempEl) tempEl.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
            if (description) {
                const descMap = data.weather[0].description.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                description.textContent = descMap;
            }
            
            if (timeEl) {
                const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
                const cityTime = new Date(utcTime + data.timezone * 1000);
                const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
                timeEl.textContent = cityTime.toLocaleDateString('en-GB', options);
            }

            document.getElementById('feels-like').innerHTML = `${Math.round(data.main.feels_like)}&deg;C`;
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('wind-speed').textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
            document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
            document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;

            const aqiUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${API_KEY}`;
            const aqiResponse = await fetch(aqiUrl);
            const aqiData = await aqiResponse.json();

            const aqiLevel = aqiData.list[0].main.aqi;
            const aqiEl = document.getElementById('aqi');
            
            let aqiText = "";
            let aqiColor = "";
            
            if (aqiLevel === 1) { aqiText = "Good"; aqiColor = "#22c55e"; }
            else if (aqiLevel === 2) { aqiText = "Fair"; aqiColor = "#84cc16"; }
            else if (aqiLevel === 3) { aqiText = "Moderate"; aqiColor = "#eab308"; }
            else if (aqiLevel === 4) { aqiText = "Poor"; aqiColor = "#f97316"; }
            else { aqiText = "Very Poor"; aqiColor = "#ef4444"; }

            aqiEl.innerHTML = `${aqiLevel} <span class="aqi-badge" style="background-color: ${aqiColor}; font-size: 0.8rem; position: relative; top: -3px; margin-left: 5px;">${aqiText}</span>`;

        } else {
            alert("City not found: " + data.message);
            window.location.href = '../index.html';
        }
    }
    catch (error) {
        console.error('Error fetching weather:', error);
    }
}

if (window.location.href.includes('main.html')) {
    fetchWeather();
}