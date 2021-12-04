const mongoose = require('mongoose')

if (process.argv.length !== 3 && process.argv.length < 5) {
  console.log(
    'If you want to return all persons provide password as an argument.'
    + '\nIf you want to add person provide password, name, and phone number as arguments.'
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://macieksej:${password}@cluster0.gndqm.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => console.log(person))
    mongoose.connection.close()
  })
}

if (process.argv.length >= 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({
    name: name,
    number: number
  })

  person.save().then(() => {
    console.log('person saved')
    mongoose.connection.close()
  })
}

