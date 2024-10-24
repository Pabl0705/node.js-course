const ditto = require('./resources/ditto.json')
const express = require('express')

const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT || 1234

// Todo el middleware se puede hacer de esta manera:

app.use(express.json())

// Primer middleware

/*
app.use((req, res, next) => {
  if (req.method !== 'POST') return next()
  if (req.headers['content-type'] !== 'application/json') return next()

  let body = ''

  // Escuchar el evento de 'data'

  req.on('data', (chunk) => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)

    // Mutar la request y meter la información al request.body

    req.body = data
    next() // Salir del middleware
  })

  console.log('Primer middleware')
})
*/

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})
app.use((req, res) => {
  res.status(404).send('<h1>Not Found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
