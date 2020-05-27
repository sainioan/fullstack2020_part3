const mongoose = require('mongoose')
require('dotenv').config()

const url= 'mongodb+srv://anniinasainio:inChrist1@cluster0-wfn7g.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

/* const Person = mongoose.model('Person', {
    name: String,
    num: String,
    important: Boolean
  })
 */
  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)