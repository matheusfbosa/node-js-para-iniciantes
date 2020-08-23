const Commander = require('commander')
const DataBase = require('./database')
const Heroi = require('./heroi')

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Herói")
        .option('-i, --id [value]', "ID do Herói")

        .option('-c, --cadastrar', "Cadastrar um Herói")
        .option('-l, --listar', "Listar um Herói")
        .option('-r, --remover', "Remover um Herói pelo ID")
        .option('-a, --atualizar [value]', "Atualizar um Herói pelo ID")
        .parse(process.argv)
    
    const heroi = new Heroi(Commander)

    try {
        if (Commander.cadastrar) {
            delete heroi.id
            
            const resultado = await DataBase.cadastrar(heroi)
            if (!resultado) {
                console.log('Herói não foi cadastrado!')
                return
            }
            console.log('Herói cadastrado com sucesso!')
        } else if (Commander.listar) {
            const resultado = await DataBase.listar()
            console.log(resultado)
            return
        } else if (Commander.remover) {
            const resultado = await DataBase.remover(heroi.id)
            if (!resultado) {
                console.error('Não foi possível remover o herói!')
                return
            }
            console.log('Herói removido com sucesso!')
        } else if (Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar)
            
            // Remover todas as chaves que estiver undefined ou null
            const dado = JSON.stringify(heroi)
            const heroiAtualizar = JSON.parse(dado)
            
            const resultado = await DataBase.atualizar(idParaAtualizar, heroiAtualizar)
            if (!resultado) {
                console.error('Não foi possível atualizar o herói!')
                return
            }
            console.log('Herói atualizado com sucesso!')
        }
    } catch (error) {
        console.error('Deu ruim', error)
    }
}

main()