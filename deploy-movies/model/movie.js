import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'

const movies = readJSON('movies.json')

export class MovieModel {
  static async getAllMovies ({ genre }) {
    if (genre) {
      return movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )
    }
    return movies
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async createMovie ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  static async deleteMovie ({ id }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }

  static async patchMovie ({ id, result }) {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false
    movies[movieIndex] = {
      ...movies[movieIndex],
      ...result
    }

    return movies[movieIndex]
  }
}
