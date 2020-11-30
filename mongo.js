const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.el984.mongodb.net/person-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length <3){
    console.log("give password")
    process.exit(1)
}
else if (process.argv.length === 3) {
    Person.find({}).then(result => {
    console.log("Phonebook:")
    result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    })
}
else if (process.argv.length === 5){
    const person = new Person({
        name: name,
        number: number,
      })
    person.save().then(response => {
    console.log(`Added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    }) 
}