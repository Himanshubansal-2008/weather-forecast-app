# 🌤 Weather Forecast App

## 🚀 Live Demo
👉 https://weather-forecast-app-seven-livid.vercel.app/

## ✨ Features
- **City Search Interface**
- **Real-Time Data Extraction**
- **Time Zone Intelligence**
- **Theme Toggle**
- **Extended Weather Metric Widgets**:
  - 🌡️ **Feels Like** Temperature
  - 💧 **Humidity** Percentage
  - 🌬️ **Wind Speed** (Converted to km/h)
  - 🌫️ **Pressure** (hPa)
  - 👀 **Visibility** (km)
- **Air Quality Index Mapping**: Features a secondary fetch hitting OpenWeather's specific Air Pollution coordinate endpoint. Condenses the 1-5 index metric dynamically into an appropriately color-coded UI text badge (Green for Good, Red for Poor)!

- **5-Day Visual Forecast Strip**: Smartly iterations down exactly 1 single representation per day, mapping OpenWeather's string output strictly into matching visual Emojis.


## 🛠️ Tech Stack Used
- HTML5
- CSS3
- JavaScript (ES6 mapping, Asynchronous Promises/fetch, LocalStorage states)
- OpenWeather API (Current Weather, 5-Day Forecast, Air Pollution Endpoints)