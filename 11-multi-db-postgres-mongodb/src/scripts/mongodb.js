// docker ps 
// docker exec -it 9d127f1af7e3 mongo -u bosamatheus -p minhasenhasecreta --authenticationDatabase herois

// Databases
show dbs

// Mudando o contexto para uma database
use herois

// Mostrar tables (coleções)
show collections // Visualizar tabelas

// Create
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

for (let i = 0; i <= 1000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1990-01-01'
    })
}

// Read
db.herois.find()
db.herois.find().pretty()
db.herois.findOne()
db.herois.find().limit(100).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })
db.herois.count()

// Update
db.herois.update(
    { _id: ObjectId("...") },
    { nome: 'Mulher Maravilha' }
)

db.herois.update(
    { _id: ObjectId("...") },
    { $set : { nome: 'Lanterna Verde' } }
)

// Delete
db.herois.remove( {} ) // Exclui tudo
