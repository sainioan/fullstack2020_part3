const mongoose = require('mongoose')
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}
const password = 'inChrist1'
//const password = process.argv[2]

// const url = process.env.MONGODB_URI
const url =
  'mongodb+srv://anniinasainio:${password}@cluster0-wfn7g.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const Person = mongoose.model('Person', {
  name: String,
  num: String,
  important: Boolean
})
Person.save().then(result => {
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
  })