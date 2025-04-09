const axios = require('axios'); //importo axios para buscar na api
require('dotenv').config(); //pegando a chave da api que fica guardada em uma variavel de ambiente

const getWeather = async (city) => { //funcao assincrona que busca as informações de acordo com o nome digitado pelo usuario
  try {
    const response = await axios.get( //faco a requisicao com o axios dentro da api, peço a temperatura em graus celsius e os textos em ptbr
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    );
    
    return { //aqui faço o tratamento do resultado das informacoes na tela principal
      temp: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      country: response.data.sys.country
    };
  } catch (error) { //faço tratamento de erros
    console.error('Erro ao buscar dados do clima:', error);
    throw error;
  }
};

module.exports = { getWeather }; //exporto para o arquivo app.js, para pode usar