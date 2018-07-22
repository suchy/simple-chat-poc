const path = require('path')
const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)

app.use(express.static(path.resolve(__dirname, '..', 'public')))
server.listen(4000, () => console.log('Chat server app listening on port 4000!'))

const io = socketIo(server)

io.on('connection', (socket) => {
  console.log('connetcted')

  socket.on('message', (message) => {
    const newMessage = {...message, timestamp: (new Date()).getTime().toString() }
    io.sockets.emit('message', newMessage)
  })
})
