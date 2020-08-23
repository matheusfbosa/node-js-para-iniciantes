const {
    readFile,
    writeFile
} = require('fs')

const {
    promisify
} = require('util')

// Utiliza promise na função readFile para trabalhar assíncronamente
const readFIleAsync = promisify(readFile)   // Readfile espera callback
const writeFileAsync = promisify(writeFile)

// Outra forma de obter dados do json:
// const dadosJson = require('./herois.json')

class DataBase {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const arquivo = await readFIleAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }
    
    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true
    }

    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <= 2 ? heroi.id : Date.now()

        /*
        {
            nome: Flash,
            poder: Speed
        }
                +
        {
            id: 1234567
        }
                =
        {
            nome: Flash,
            poder: Speed,
            id: 1234567
        }
        */ 
        
        const heroiComId = {
            id,
            ...heroi
        }

        // Concatena o objeto heroiComId com o array dados
        const dadosFinal = [
            ...dados,
            heroiComId
        ]

        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => id ? (item.id === id) : true)
        return dadosFiltrados
    }

    async remover(id) {
        if (!id) {
            return await this.escreverArquivo([])
        }
        
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error('O herói informado não existe!')
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, modificacoes) {
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error('O heroi informado não existe!')
        }
        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        
        dados.splice(indice, 1)

        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])
    }
}

module.exports = new DataBase()
