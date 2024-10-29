import { Router } from 'express'
import { MovieController } from '../controladores/movies.js'

export const createMovieRouter = ({ movieModel }) => {
  const moviesRouter = Router()

  const movieController = new MovieController({ movieModel })

  moviesRouter.get('/', movieController.controlGetAll)
  moviesRouter.post('/', movieController.controlPostMovie)

  moviesRouter.get('/:id', movieController.controlGetById)
  moviesRouter.delete('/:id', movieController.controlDeleteMovie)
  moviesRouter.patch('/:id', movieController.controlUpdateMovie)

  return moviesRouter
}
