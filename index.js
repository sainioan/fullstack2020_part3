
const express = require('express')
const app = express()

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


  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
