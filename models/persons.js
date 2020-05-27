const mongoose = require('mongoose')

const url= 'mongodb+srv://anniinasainio:inChrist1@cluster0-wfn7g.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    num: String,
    important: Boolean
  })

  module.exports=Person