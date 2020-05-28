
const mongoose = require('mongoose')
/* if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
} */

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `MONGODB_URI=mongodb+srv://anniinasainio:${password}@cluster0-wfn7g.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(url, { useNewUrlParser: true })


const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if ( process.argv.length<5 ) {
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
  })
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })
  person.save().then(response => {
    console.log('person saved!')
    mongoose.connection.close()
  })
}
