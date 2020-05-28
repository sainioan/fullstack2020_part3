require('dotenv').config()
const express = require('express')
const app = express()
app.use(express.static('build'))

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const morgan = require('morgan')
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))
morgan.token('json', (req,res) => JSON.stringify(req.body))

const Person = require('./models/person')

app.get('/', (req, res) => {
  res.send('<h1>Nothing to see, please move on..</h1>')
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(p =>  {
      res.send(`<p>Phonebook has info for ${p.length} people</p>
          <p>${new Date()}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(ps => res.json(ps.map(p => p.toJSON())))
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(p => res.json(p.toJSON()))
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.post('/api/persons/', (req, res, next) => {
  const body = req.body
  if (!(body.name && body.number)) {
    return res.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  const person = new Person({
    name: body.name,
    number: body.number,
    //    id: Math.floor(Math.random()*10000)
  })
  person.save()
    .then(saved => res.json(saved.toJSON()))
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updated => res.json(updated.toJSON()))
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } 
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
/* 
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose  = require('mongoose')
const bodyParser = require('body-parser')
const Person = require('./models/person');
const cors = require('cors')

mongoose.set('useFindAndModify', false);
app.use(express.json())


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
  app.get('/info', (req, res) => {
    Person.find({}).then((persons) =>
      res.send(`
      <div>
      Phonebook has info for ${persons.length} people
      </div>
      <br>
      <div>
      ${Date()}
      </div>`)
    );
  });
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

 */
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
 /*  app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
      .then((person) => {
        if (person) {
          res.json(person.toJSON());
        } else {
          res.status(404).end();
        }
      })
      .catch((err) => next(err));
  });

 
  app.post('/api/persons', (request, response) => {
    const body = request.body

      if(!body.name){
      return response.status(400).json({
        error: 'name missing'}
       ) }
      if(!body.number){
      return response.status(400).json({error: 'number missing'})}
       
      if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({error:'name must be unique'})
       }
        
       
       const person = ({
        name:body.name,
        number:body.number,
        id:Math.floor(Math.random()*10000000000000000000)
      });

	person
  .save()
  .then((savedPerson) => {
    res.json(savedPerson.toJSON());
  })
  .catch((err) => next(err));
      persons = persons.concat(person)
      response.json(person)
    }
  )
  

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !==id)
    response.status(204).end()
    
  })
 
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  }); */