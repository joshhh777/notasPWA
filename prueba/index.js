const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hola Jose Cancino</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.post('/api/notes', (request, response) => {
  const nota = request.body

  const idnota = notes.map(nota => nota.id)
  const idmax = Math.max(...idnota)

  const nuevaNota = {
    id: idmax + 1,
    content: nota.content,
    date: new Date().toISOString(),
    important: nota.important
  }

  notes = [
    ...notes,
    nuevaNota
  ]

  response.status(201).json(nuevaNota)
})

app.use((req, res, next) => {
  res.status(404).send('<h1 style = "color:red">Pagina de Error</h1>')
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
