
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(express.json())
const Person = require('./models/person')


app.use(bodyParser.json())

morgan.token('person', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())
app.use(express.static('build'))
let persons = [
    { 
       
        content: 
        {name : "Arto Hellas", 
        number: "040-123456"},
        id: 1,

      },
        
      { 
      
        content: {
        name : "Ada Lovelace", 
        number: "39-44-5323523",
        },
        id: 2
      },
        
    
     { 
       
        content: {
        name :  "Dan Abramov", 
        number: "12-43-234345",
        },
        id: 3,
      },
      { 
      
        content: {
        name :  "Mary Poppendieck", 
        number: "39-23-6423122",
        },
        id: 4,
     },
]
const size = persons.length


app.get('/info', (req, res) => {
    res.send('<p>Phonebook has info for ' + size + ' people</p>'+ '<p> ' + new Date() +'</p>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })


  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id ===id)
    if (person){
    response.json(person)
    }
    else{
      response.status(404).end()
    }
  })

 
  app.post('/api/persons', (request, response) => {
    const body = request.body

      if(!body.name){
      return response.status(400).json({
        error: 'name missing'}
       ) }
      if(!body.number){
      return response.status(400).json({error: 'number missing'})}
       
      if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({error:'name must be unique'})
       }
        const person = {
        name:body.name,
        number:body.number,
        id:Math.floor(Math.random()*10000000000000000000)
      }
      persons = persons.concat(person)
      response.json(person)
      person.save().then(savedPerson => savedPerson.toJSON())
      .then(savedAndFormattedPerson => {
        response.json(savedAndFormattedPerson)
      })
    }
  )
  

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !==id)
    response.status(204).end()
    
  })
 
const PORT = process.env.PORT || 3001 || 45244
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})