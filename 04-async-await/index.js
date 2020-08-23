/*
0. Obter o usuario
1. Obter o numero de telefone de um usuario a partir de seu id
2. Obter o endereco do usuario pelo id
*/

// Importamos um modulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    // Quando der algum problema -> reject(ERRO)
    // Quando success -> resolver
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function() {
            // return reject(new Error('Deu ruim de verdade!'))
            
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1199002',
                ddd: 11       
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setInterval(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 3000);   
}

// 1. Adicionar a palavra async -> automaticamente ela retornará uma Promise
main()

async function main() {
    try {
        console.time('medida-promise')

        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)

        // Coloca num unico await para ser mais rapido
        // Telefone e endereco dependem somente do usuario
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])

        const telefone = resultado[0]
        const endereco = resultado[1]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)

        console.timeEnd('medida-promise')
    } catch (error) {
        console.error('Deu ruim!', error)
    }
}
