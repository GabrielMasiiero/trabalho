require('dotenv').config();
const express = require('express');
const axios = require('axios');
const countryService = require('./services/countryService');
const weatherService = require('./services/weatherService');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/search', async (req, res) => {
  try {
    const city = req.body.city;
    
    // Primeiro obtemos o clima
    const weatherData = await weatherService.getWeather(city);
    
    // Depois obtemos informações do país
    const countryData = await countryService.getCountryInfo(weatherData.country);
    
    res.render('results', {
      city,
      weather: weatherData,
      country: countryData
    });
    
  } catch (error) {
    console.error(error);
    res.render('index', {
      error: 'Não foi possível encontrar informações para esta cidade. Tente novamente.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});