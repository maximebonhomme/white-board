const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const app = express()
const port = process.env.PORT || 9000

const server = http.createServer(app)
const io = socketIo(server)

const addUser = (socket) => {
  socket.broadcast.emit("addUser", socket.id)
}

const removeUser = (socket) => {
  socket.broadcast.emit("removeUser", socket.id)
}

io.on("connection", (socket) => {
  console.log("Client connected", socket.id)

  addUser(socket)

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id)

    removeUser(socket)
  })
})

app.use(express.static("client/build"))

server.listen(port, () => console.log(`Listening on port ${port}`))
