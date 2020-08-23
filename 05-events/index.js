const EventEmitter = require('events')

class MeuEmissor extends EventEmitter {

} 
const meuEmissor = new MeuEmissor()
const nomeEvento = 'usuario:click'
meuEmissor.on(nomeEvento, function (click) {
    console.log('Um usuario clicou', click)
})

/*
meuEmissor.emit(nomeEvento, 'na barra de rolagem')
meuEmissor.emit(nomeEvento, 'no ok')

let count = 0
setInterval(function () {
    meuEmissor.emit(nomeEvento, 'no ok' + (count++))
}, 1000)
*/

const stdin = process.openStdin()

// Captura evento apenas uma vez:
function main() {
    return new Promise(function (resolve, reject) {
        stdin.addListener('data', function (value) { // Ouvindo evento
            return resolve(value)
        })
    })
}
main().then(function (resultado) {
    console.log('Resultado', resultado.toString())
})

// Para monitorar continuamente:
/*
stdin.addListener('data', function (value) { // Ouvindo evento
    console.log(`Voce digitou: ${value.toString().trim()}`)
})
*/
