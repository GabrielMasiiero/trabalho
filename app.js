require('dotenv').config(); //permite usar variaveis de ambiente, como minha key da API que esta no .env
const express = require('express'); //framework usando para criar servidor
const axios = require('axios'); // usado para fazer requisição http, buscar dados na internet
const countryService = require('./services/countryService'); //arquivo que estou usando da api
const weatherService = require('./services/weatherService');//arquivo que estou usando da api

const app = express(); //criando o servidor
const PORT = process.env.PORT || 3000; //definindo a porta que vai rodar

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => { // pagina de inicio da aplicação
  res.render('index');
});

app.post('/search', async (req, res) => { //aqui temos nossa rota post
  try {
    const city = req.body.city;
    
    // Primeiro obtemos o clima
    const weatherData = await weatherService.getWeather(city);
    
    // Depois obtemos informações do país
    const countryData = await countryService.getCountryInfo(weatherData.country);
    
    res.render('results', { //tratação de erros, se der erro volta pra pagina inicial
      city,
      weather: weatherData,
      country: countryData
    });
    
  } catch (error) {
    console.error(error);
    res.render('index', {
      error: 'Não foi possível encontrar informações para esta cidade. Tente novamente.' //mensagem se nao encontrar cidade na API
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`); //aqui é pra dar a mensagem no console 
});


//http://localhost:3000/