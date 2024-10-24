const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Invalid title format, must be a string',
    required_error: 'Title is required'
  }).min(3).max(50),
  genre: z.array(z.enum(['Action', 'Crime', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Romance', 'Thriller', 'Sci-Fi'])),
  year: z.number().int().min(1900).max(new Date().getFullYear()),
  director: z.string().min(3).max(50),
  duration: z.number().int().positive().max(300),
  rate: z.number().min(0).max(10).optional(),
  poster: z.string().url({
    message: 'Invalid poster, must be a valid URL'
  }) // .endsWith('.jpg')
})

const validateMovie = (inputCreate) => {
  return movieSchema.safeParse(inputCreate)
}

const validateMoviePartially = (inputPatch) => {
  return movieSchema.partial().safeParse(inputPatch)
}

module.exports = {
  validateMovie,
  validateMoviePartially
}
