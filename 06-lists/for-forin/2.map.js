const service = require('./service')

// Criando nosso map:
Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let indice = 0; indice <= this.length - 1; indice++) {
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
}

async function main() {
    try {
        const resultados = await service.obterPessoas('a')

        /*
        // Usando forEach:
        const names = []
        resultados.results.forEach(function (item) {
            names.push(item.name)
        })
        */

        /*
        // Usando map:
        const names = resultados.results.map(function (pessoa) {
            return pessoa.name
        })
        */

        /*
        // Usando map (mais elegante):
        const names = resultados.results.map(pessoa => pessoa.name)
        */

        const names = resultados.results.meuMap(function (pessoa, indice) {
            return `[${indice}] ${pessoa.name}`
        })

        console.log('Names', names)
    } catch (error) {
        console.error('Deu ruim', error)
    }
}

main()