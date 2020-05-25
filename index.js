
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}


app.use(bodyParser.json())
morgan.token('person', (request) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))


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
  
/*   app.get('/api/persons', (req, res) => {

    res.json(persons)
  }) */

  app.get('/api/persons', (request, response, next) => {
    Persons.find({}).then(people => {
        response.json(people.map(person => person.toJSON()))
    }).catch(error => next(error))

})
/*   app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id ===id)
    if (person){
    response.json(person)
    }
    else{
      response.status(404).end()
    }
  }) */
  app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person.toJSON())
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
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
    }
  )

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !==id)
    response.status(204).end()
    
  })
 

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
      return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})