const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        localStorage.setItem('selectedCity', city);
        window.location.href = 'main.html';
    } else {
        alert('Please enter a city name');
    }
});

cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getWeatherBtn.click();
    }
});