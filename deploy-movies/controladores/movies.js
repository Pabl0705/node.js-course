import { validateMovie, validateMoviePartially } from '../schemas/movieSchema.js'

export class MovieController {
  constructor ({ movieModel }) {
    this.movieModel = movieModel
  }

  controlGetAll = async (req, res) => {
    const { genre } = req.query
    const movies = await this.movieModel.getAllMovies({ genre })
    res.json(movies)
  }

  controlGetById = async (req, res) => {
    const id = req.params.id
    const movie = await this.movieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  controlPostMovie = async (req, res) => {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const newMovie = await this.movieModel.createMovie({ input: result.data })

    res.status(201).json(newMovie)
  }

  controlDeleteMovie = async (req, res) => {
    const id = req.params.id

    const foundMovieBool = await this.movieModel.deleteMovie({ id })

    if (foundMovieBool === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  controlUpdateMovie = async (req, res) => {
    const id = req.params.id
    const result = validateMoviePartially(req.body)

    if (result.error) {
      return res.status(400).json({ message: 'Invalid movie data' })
    }

    const updatedMovie = await this.movieModel.patchMovie({ id, result: result.data })

    if (updatedMovie === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json(updatedMovie)
  }
}
