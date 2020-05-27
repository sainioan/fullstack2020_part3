const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  'mongodb+srv://anniinasainio:${password}@cluster0-wfn7g.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Person = mongoose.model('person', personSchema)

/* const Person = new Note({
  content: 'HTML is Easy',
  date: new Date(),
  important: true,
}) */

note.save().then(result => {
  console.log('person saved!')
  mongoose.connection.close()
})