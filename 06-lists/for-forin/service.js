const axios = require('axios')
const URL = `https://swapi.co/api/people`

async function obterPessoas(nome) {
    const url = `${URL}/?search=${nome}&format=json`
    const response = await axios.get(url) // Axios é uma promise, por isso precisa 'await'
    return response.data
}

/*
// Teste:
obterPessoas('r2')
    .then(function (resultado) {
        console.log('Resultado', resultado)
    })
    .catch(function (error) {
        console.error('Deu ruim', error)
    })
*/

module.exports = {
    obterPessoas // Mesma coisa: 'obterPessoas: obterPesssoas'
}