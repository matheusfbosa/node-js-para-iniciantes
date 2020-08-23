/*
0. Obter o usuario
1. Obter o numero de telefone de um usuario a partir de seu id
2. Obter o endereco do usuario pelo id
*/

function obterUsuario(callback) {
    // Retorna usuario apos 1 seg
    setTimeout(function() {
        return callback(null, { // Chama a funcao e passa a funcao callback
            id: 1,
            nome: 'Aladin',
            dataNascimento: new Date()
        })
    }, 1000)
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '1199002',
            ddd: 11       
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setInterval(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 3000);   
}

// Padrao: funcao(erro, sucesso)
obterUsuario(function resolverUsuario(erro, usuario) {
    // Em JS: null || '' || 0 === false
    if (erro) {
        console.error('Deu ruim em Usuario!', erro)
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
        if (erro1) {
            console.error('Deu ruim em Telefone!', erro1)
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
            if (erro2) {
                console.error('Deu ruim em Endereco!', erro2)
                return;
            }

            console.log(`
                Nome: ${usuario.nome}
                Endereco: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd}) ${telefone.telefone}
            `)
        })
    })
})
