const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  if (req.url === '/') {
    res.statusCode = 200 // Este valor realmente es por defecto, no haria falta ponerlo
    res.end('Bienvenido al server! :)')
  } else if (req.url === '/imagen-mu-bonita') {
    fs.readFile('./resources/Captura.JPG', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('Internal Server Error.')
      } else {
        res.setHeader('Content-Type', 'image/jpg')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.end('Para contactar con nosotros, escribenos a 1234567890.')
  } else {
    res.statusCode = 404
    res.end('La ruta no existe.')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server running on http://localhost:${desiredPort}`)
})

/*
STATUS CODES NOTES:
100-199: Informational Responses
200-299: Successful Responses
200: OK
300-399: Redirection Responses
301: Moved Permanently
400-499: Client Error Responses
400: Bad Request
404: Not Found
500-599: Server Error Responses
500: Internal Server Error
*/
