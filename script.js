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

            if (cityEl) cityEl.textContent = `${data.name}, ${data.sys.country}`;
            if (tempEl) tempEl.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
            
            if (timeEl) {
                const utcTime = new Date().getTime() + (new Date().getTimezoneOffset() * 60000);
                const cityTime = new Date(utcTime + data.timezone * 1000);
                const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
                timeEl.textContent = cityTime.toLocaleDateString('en-GB', options);
            }
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