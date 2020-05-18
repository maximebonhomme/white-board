const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const app = express()
const port = process.env.PORT || 9000

const server = http.createServer(app)
const io = socketIo(server)

const getApiAndEmit = (socket) => {
  const response = new Date()
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response)
}

let interval
io.on("connection", (socket) => {
  console.log("New client connected", socket.id)
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000)
  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id)
    clearInterval(interval)
  })
})

app.use(express.static("client"))

server.listen(port, () => console.log(`Listening on port ${port}`))
