import { createApp } from './app.js'
import { MovieModel } from './model/mysql/movies.js'

createApp({ movieModel: MovieModel })
