const path = require('path')
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)

app.use(express.static(path.resolve(__dirname, '..', 'public')))
server.listen(4000, () => console.log('Chat server app listening on port 4000!'))

const io = socketIo(server)

const getTimestamp = () => (new Date()).getTime().toString()

const clients = {}

io.on('connection', (socket) => {
  const { identifier } = socket.handshake.query

  if (clients[identifier]) {
    clients[identifier].disconnect()
    clients[identifier] = socket
  } else {
    if (Object.values(clients).length < 2) {
      clients[identifier] = socket
    } else {
      socket.disconnect()
    }
  }

  socket
    .on('disconnect', () => delete clients[identifier])
    .on('message', (message) => io.sockets.emit('message', { ...message, timestamp: getTimestamp() }))
    .on('isWriting', (event) => io.sockets.emit('isWriting', event))
})
