const path = require('path')
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)

app.use(express.static(path.resolve(__dirname, '..', 'public')))
const port = process.env.PORT || 4000
server.listen(port, () => console.log(`Chat server app listening on port ${port}!`))

const io = socketIo(server)

const getTimestamp = () => (new Date()).getTime().toString()

const users = {}

io.on('connection', (socket) => {
  const { userIdentifier } = socket.handshake.query

  if (users[userIdentifier]) {
    users[userIdentifier].disconnect()
    users[userIdentifier] = socket
  } else {
    if (Object.values(users).length < 2) {
      users[userIdentifier] = socket
    } else {
      socket.disconnect()
    }
  }

  socket
    .on('disconnect', () => delete users[userIdentifier])
    .on('message', (message) => io.sockets.emit('message', { ...message, timestamp: getTimestamp() }))
    .on('isWriting', (event) => io.sockets.emit('isWriting', event))
})
