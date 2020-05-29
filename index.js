require('dotenv').config()
const express = require('express')

const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
morgan.token('json', (request, response) => JSON.stringify(request.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))
app.use(cors())
app.use(express.static('build'))


app.get('/info', (request, response, next) => {
  Person.find({})
    .then((phonebook) => {
      response.send(`<p>Phonebook has info for ${phonebook.length} people</p>
          <p>${new Date()}</p>`)
    })
    .catch((error) => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then((people) => response.json(people.map((contact) => contact.toJSON())))
    .catch((error) => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((contact) => response.json(contact.toJSON()))
    .catch((error) => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
response.status(204).end()
}).catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  const { body } = request
  if (!(body.name && body.number)) {
    return response.status(400).json({
      error: 'name or number missing',
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,

  })
  person.save()
    .then((saved) => response.json(saved.toJSON()))
    .catch((error) => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const { body } = request
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updated) => response.json(updated.toJSON()))
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
