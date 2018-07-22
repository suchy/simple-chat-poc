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

io.on('connection', (socket) => {
  socket.on('message', (message) => io.sockets.emit('message', { ...message, timestamp: getTimestamp() }))
})
