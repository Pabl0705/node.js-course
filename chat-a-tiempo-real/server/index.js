import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'chatdb'
}

const connection = await mysql.createConnection(config)

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

await connection.query(`CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY, 
  content TEXT,
  user TEXT)
  `)

io.on('connection', async (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('message', async (msg) => {
    let result
    const user = socket.handshake.auth.username ?? 'Anonymous'
    try {
      result = await connection.query('INSERT INTO messages (content, user) VALUES (?, ?)', [msg, user])
    } catch (err) {
      console.error(err)
      return
    }
    io.emit('message', msg, result[0].insertId.toString(), user)
  })

  if (!socket.recovered) {
    try {
      const results = await connection.query('SELECT * FROM messages WHERE id > ?', [socket.handshake.auth.serverOffset ?? 0])
      results[0].forEach(row => {
        socket.emit('message', row.content, row.id.toString(), row.user)
      })
    } catch (err) {
      console.error(err)
    }
  }
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
})

const port = process.env.PORT ?? 3000

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
