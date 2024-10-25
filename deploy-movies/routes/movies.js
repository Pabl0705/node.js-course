import { Router } from 'express'
import { MovieController } from '../controladores/movies.js'

export const moviesRouter = Router()

moviesRouter.get('/', MovieController.controlGetAll)
moviesRouter.post('/', MovieController.controlPostMovie)

moviesRouter.get('/:id', MovieController.controlGetById)
moviesRouter.delete('/:id', MovieController.controlDeleteMovie)
moviesRouter.patch('/:id', MovieController.controlUpdateMovie)
