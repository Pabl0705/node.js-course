import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'moviesdb'
}

const connection = await mysql.createConnection(config)

export class MovieModel {
  static async getAllMovies ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      const [genres] = await connection.query('SELECT id FROM genres WHERE LOWER(name) =?', [lowerCaseGenre], ';')

      if (genres.length === 0) return []

      const [{ id }] = genres

      // get all movies ids from database table
      const [movieIdsWithGenre] = await connection.query('SELECT * FROM movie_genres WHERE genre_id =?;', [id])

      // la query a movie_genres
      const [movieGenreResult] = await connection.query('SELECT * FROM movies WHERE id IN (?)', [movieIdsWithGenre.map(movie => movie.movie_id)], ';')

      if (movieGenreResult.length === 0) return []

      // join
      const query = `
        SELECT 
            BIN_TO_UUID(m.id) as id, 
            m.title, 
            m.year, 
            m.director, 
            m.duration, 
            m.poster, 
            m.rate 
        FROM 
            movies m 
        INNER JOIN 
            movie_genres mg ON m.id = mg.movie_id
        WHERE 
            mg.genre_id = ?`

      const [filteredMovies] = await connection.query(query, [id])

      // y devolver resultado

      return filteredMovies
    }
    const [movies] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies;')

    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(`SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate 
                                            FROM movies WHERE id = UUID_TO_BIN(?);`, [id])
    return movie.length === 0 ? null : movie
  }

  static async createMovie ({ input }) {
    const {
      title,
      year,
      director,
      duration,
      poster,
      rate,
      genre: genreInput // genre is an array
    } = input

    const [uuidResult] = await connection.query('SELECT UUID() uuid;')
    const [{ uuid }] = uuidResult

    try {
      await connection.query(
        'INSERT INTO movies (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?);',
        [uuid, title, year, director, duration, poster, rate]
      )
    } catch (err) {
      // puede enviarle información sensible (cuidado enviando el error!)
      throw new Error('Error al insertar la película:')
    }
    // Obtener el id de la película insertada
    const [movies] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);',
      [uuid]
    )

    for (const genre of genreInput) {
      // Primero, busca el genre_id en la tabla genres
      const [genreResult] = await connection.query(
        'SELECT id FROM genres WHERE LOWER(name) = ?',
        [genre.toLowerCase()]
      )

      // Asegúrate de que el género existe
      if (genreResult.length > 0) {
        const genreId = genreResult[0].id

        // Inserta en la tabla movie_genres
        await connection.query(
          'INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?)',
          [uuid, genreId]
        )
      } else {
        console.error(`Género "${genre}" no encontrado en la base de datos.`)
      }
    }
    /*   PODEMOS VERIFICAR EL FUNCIONAMIENTO DE LA INSERCIÓN DE GENEROS AQUI
    const [moviesGenres] = await connection.query('SELECT BIN_TO_UUID(movie_id) movie_id, genre_id FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);',
      [uuid]
    )
    console.log(moviesGenres)
    */

    return movies[0]
  }

  static async deleteMovie ({ id }) {
    const [movie] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);',
      [id]
    )
    if (movie.length === 0) return false
    await connection.query('DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?);', [id])
    await connection.query('DELETE FROM movies WHERE id = UUID_TO_BIN(?);', [id])
    return movie
  }

  static async patchMovie ({ id, result }) {
    // Obtener las claves y valores a actualizar
    const keyToUpdate = Object.keys(result)
    const valueToUpdate = Object.values(result)

    // Verificar si la película existe
    const [movie] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);', [id])
    if (movie.length === 0) return false

    // Construir la parte SET del query dinámicamente
    const setClause = keyToUpdate.map(key => `${key} = ?`).join(', ')

    // Ejecutar la actualización
    await connection.query(`UPDATE movies SET ${setClause} WHERE id = UUID_TO_BIN(?)`, [...valueToUpdate, id])

    // Retornar la película actualizada
    const [updatedMovie] = await connection.query('SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movies WHERE id = UUID_TO_BIN(?);', [id])

    return updatedMovie
  }
}
