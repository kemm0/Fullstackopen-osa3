const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/info', (req, res) => {
  var date = new Date()
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`
  )
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(p => p.id === id)
  if(person){
    return response.json(person)
  }
  else{
    return response.status(400).json({
      error: 'Content missing'
    })
  }
})

app.delete('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id != id)
  return response.status(204).end()
})
app.post('/api/persons/',(request, response) => {
  const body = request.body
  if(!body.name){
    return response.status(400).json({
      error: "content missing"
    })
  }
  const person = {
    id: Math.trunc(Math.random() * 1000),
    name: body.name,
    number: body.number
  }
  console.log(person)
  persons = persons.concat(person)

  return response.json(person)
})


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})