
const express = require('express')
const app = express()
app.use(express.json())
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

  /*   if(!body.content){
      return response.status(400).json({
        error: 'content missing'
      }) */
      const person ={
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

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
