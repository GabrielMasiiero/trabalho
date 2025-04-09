const axios = require('axios'); //importo o axios

const getCountryInfo = async (countryCode) => { //funcao que recebe codigo da cidade pesquisada
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`); //faz requisicao na api 
    const country = response.data[0]; //pega os dados do pais
    
    return { //aqui estou organizando os dados que quero retornar na nossa tela da aplicacao
      name: country.name.common,
      capital: country.capital?.[0] || 'Não disponível',
      currency: Object.values(country.currencies)?.[0]?.name || 'Não disponível',
      language: Object.values(country.languages)?.[0] || 'Não disponível',
      population: country.population.toLocaleString(),
      flag: country.flags.png //pego o link da bandeira
    }; 
  } catch (error) { //faço tratamento de erro, caso na encontre nada
    console.error('Erro ao buscar informações do país:', error);
    throw error;
  }
};

module.exports = { getCountryInfo }; //exporto essa função para que outros arquivos do projeto possam usar ela

//codigo que se conecta com a API para nossa aplicação