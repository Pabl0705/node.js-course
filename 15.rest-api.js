// REST es una arquitectura de software que permite el
// intercambio de datos entre sistemas.
// Con REST creamos el REST API
/*
  - Simplicidad
  - Escalabilidad
  - Fiabilidad
  - Portabilidad
  - Visibilidad
  - Modificabilidad
*/
// Cada recurso tiene un identificador único (URL)
// Tambien tienen las operaciones que se pueden realizar sobre ellos (GET, POST, PUT, DELETE...), CRUD (Create, Read, Update, Delete)
// Puede tener representaciones en diferentes formatos (JSON, XML, HTML, CSV...)

const movies = require('./resources/movies.json')
const crypto = require('node:crypto')
const express = require('express')
const { validateMovie, validateMoviePartially } = require('./schemas/movieSchema')
const app = express()

// Este middleware soluciona CORS, pero permite el acceso a recursos desde cualquier origen por defecto
// const cors = require('cors')

app.disable('x-powered-by')

// Todos los recurso que sean MOVIES se identifican como /movies

app.use(express.json())

const ACCEPTED_ORIGINS = ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:1234', 'https://movies.com'] // Array de origenes permitidos

// De esta manera añadimos el middleware de cors para todo ---------------------------------------------

// app.use(cors())

// De esta manera añadimos el middleware de cors para algunos origenes específicos ---------------------

/*
  app.use((req, res, next) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) ||!origin) {
      res.header('Access-Control-Allow-Origin', origin)
    }
    next()
  })
*/

app.get('/movies', (req, res) => {
  // Se podria analizar el formato y hacer algo diferente segun el formato
  /*
  const format = req.query.format
    if (format === 'html') {
      bla bla bla
    }
    else if (format === 'csv') {
      bla bla bla
    }
  */
  // Filtrado por genero

  // res.header('Access-Control-Allow-Origin', 'http://localhost:8080')

  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
  }

  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
}) // Cada path con recurso es un endpoint

app.get('/movies/:id', (req, res) => {
  const id = req.params.id
  const movie = movies.find((movie) => movie.id === id)
  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  // ESTO NO ES REST, PORQUE GUARDAMOS EL ESTADO EN MEMORIA, NO EN BASE DE DATOS

  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)

  res.status(201).json(newMovie)
})

app.delete('/movies/:id', (req, res) => {
  const origin = req.header('origin')
  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin) // Esto es importante
  }

  const id = req.params.id
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})

app.patch('/movies/:id', (req, res) => {
  const id = req.params.id
  const result = validateMoviePartially(req.body)

  if (result.error) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie
  return res.status(202).json(updatedMovie)
})

app.options('/movies/:id', (req, res) => {
  const origin = req.header('origin')

  if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  }
  res.send()
})
const PORT = process.env.PORT || 1234

app.listen(PORT, () => {
  console.log(`Server is on http://localhost:${PORT}`)
})
