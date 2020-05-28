const mongoose = require('mongoose')
/* if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
} */

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const password = 'inChrist1'
//const password = process.argv[2]

// const url = process.env.MONGODB_URI
const url = 'MONGODB_URI=mongodb+srv://anniinasainio:inChrist1@cluster0-wfn7g.mongodb.net/test?retryWrites=true&w=majority'
//mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(url)
//mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)
/* const Person = mongoose.model('Person', {
  name: String,
  num: String,
  important: Boolean
}) */
/* Person.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})

Person
  .find({})
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  }) */

  if (process.argv.length === 3) {
    console.log('\nphonebook:')
    Person
      .find({})
      .then(persons=> {
        persons.forEach( person => console.log(`${person.name} ${person.number}`))
        console.log('')
        mongoose.connection.close();
      })
  } else {
      person.save().then(response => {
        console.log(`added ${name} number ${number} to phonebook`);
        mongoose.connection.close();
      })
  }