const http = require('node:http')
const { findAvailablePort } = require('./11.free-port.js')

const desiredPort = process.env.PORT ?? 3000
const server = http.createServer((request, response) => {
  console.log('Request received')
  response.end('Hello World!')
})

findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
  })
})
