const axios = require('axios');
require('dotenv').config();

const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    );
    
    return {
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      country: response.data.sys.country
    };
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    throw error;
  }
};

module.exports = { getWeather };