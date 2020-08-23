const {
    deepEqual,
    ok
} = require('assert')

const DEFAULT_ITEM_CADASTRAR = {
    id: 1,
    nome: 'Flash',
    poder: 'Speed'
}

const DEFAULT_ITEM_ATUALIZAR = {
    id: 2,
    nome: 'Lanterna Verde',
    poder: 'Energia do Anel'
}

const dataBase = require('./database')

describe('Suíte de manipulação de heróis', () => {
    before(async () => {
        await dataBase.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await dataBase.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })

    it('Deve pesquisar um heroi usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        // [...] pega primeira posição de "resultado"
        const [resultado] = await dataBase.listar(expected.id)
        
        deepEqual(resultado, expected)
    })

    it('Deve cadastrar um heroi usando arquivos', async () => {
        const expected = { 
            ...DEFAULT_ITEM_CADASTRAR,
            nome: 'Superman',
            poder: 'Laser'
        }
        const resultado = await dataBase.cadastrar(expected)
        const [actual] = await dataBase.listar(expected.id)
        deepEqual(actual, expected)
    })

    it('Deve remover um heroi por id', async () => {
        const expected = true
        const resultado = await dataBase.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it.only('Deve atualizar um heroi pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        const novoDado = {
            nome: 'Batman',
            poder: 'Dinheiro'
        }

        await dataBase.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await dataBase.listar(DEFAULT_ITEM_ATUALIZAR.id)
        deepEqual(resultado, expected)
    })
})