const axios = require('axios');

const getCountryInfo = async (countryCode) => {
  try {
    const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    const country = response.data[0];
    
    return {
      name: country.name.common,
      capital: country.capital?.[0] || 'Não disponível',
      currency: Object.values(country.currencies)?.[0]?.name || 'Não disponível',
      language: Object.values(country.languages)?.[0] || 'Não disponível',
      population: country.population.toLocaleString(),
      flag: country.flags.png
    };
  } catch (error) {
    console.error('Erro ao buscar informações do país:', error);
    throw error;
  }
};

module.exports = { getCountryInfo };