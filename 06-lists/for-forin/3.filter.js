const {
    obterPessoas
} = require('./service') // De service pega apenas obterPessoas (destructuring)

/* Exemplo:
const item = {
    nome: 'Erick',
    idade: 12
}

const { nome } = item
console.log(nome)

*/
Array.prototype.meuFilter = function (callback) {
    const lista = []
    for (index in this) {
        const item = this[index]
        const resultado = callback(item, index, this)
        // 0, "", null, undefined === false
        if (!resultado) continue;
        lista.push(item)
    }
    return lista;
}

async function main() {
    try {
        const {
            results
        } = await obterPessoas(`a`)

        /*
        const familiaLars = results.filter(function (item) {
            // Por padrão precisa retornar um booleano
            // Para informar se deve manter ou remover da lista
            // false -> remove da lista
            // true -> mantém
            // Não Encontrou = -1
            // Encontrou = posicaoNoArray
            const result = item.name.toLowerCase().indexOf(`lars`) !== -1
            return result
        })
        */

        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index}`, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })
        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)
    } catch (error) {
        console.log('Deu ruim', error)
    }
}

main()
