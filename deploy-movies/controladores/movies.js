import { MovieModel } from '../model/movie.js'
import { validateMovie, validateMoviePartially } from '../schemas/movieSchema.js'

export class MovieController {
  static async controlGetAll (req, res) {
    const { genre } = req.query
    const movies = await MovieModel.getAllMovies({ genre })
    res.json(movies)
  }

  static async controlGetById (req, res) {
    const id = req.params.id
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static async controlPostMovie (req, res) {
    const result = validateMovie(req.body)

    if (result.error) {
      return res.status(400).json({ message: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.createMovie({ input: result.data })

    res.status(201).json(newMovie)
  }

  static async controlDeleteMovie (req, res) {
    const id = req.params.id

    const foundMovieBool = await MovieModel.deleteMovie({ id })

    if (foundMovieBool === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  static async controlUpdateMovie (req, res) {
    const id = req.params.id
    const result = validateMoviePartially(req.body)

    if (result.error) {
      return res.status(400).json({ message: 'Invalid movie data' })
    }

    const updatedMovie = await MovieModel.patchMovie({ id, result: result.data })

    if (updatedMovie === false) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json(updatedMovie)
  }
}
