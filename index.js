
const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
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
       // date: new Date(),
      //  important: true
      },
        
      { 
      
        content: {
        name : "Ada Lovelace", 
        number: "39-44-5323523",
        },
        id: 2
       // date: new Date(),
       // important: true
      },
        
    
     { 
       
        content: {
        name :  "Dan Abramov", 
        number: "12-43-234345",
        },
        id: 3,
       // date: new Date(),
       // important: true 
      },
      { 
      
        content: {
        name :  "Mary Poppendieck", 
        number: "39-23-6423122",
        },
        id: 4,
       // date: new Date(),
       // important: true
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
    }
  )

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !==id)
    response.status(204).end()
    
  })
 
  
 

app.get('*', function (req, res) { // This wildcard method handles all requests

    Router.run(routes, req.path, function (Handler, state) {
        const element = React.createElement(Handler);
        const html = React.renderToString(element);
        res.render('main', { content: html });
    });
});
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})