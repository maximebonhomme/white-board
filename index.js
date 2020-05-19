const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const randomName = require("node-random-name")

const app = express()
const port = process.env.PORT || 9000

const server = http.createServer(app)
const io = socketIo(server)

let connectedUsers = []

io.on("connection", (socket) => {
  const user = {
    id: socket.id,
    name: randomName(),
  }
  console.log("Client connected", user.name)

  connectedUsers.push(user)

  io.of("/").emit("userList", connectedUsers)
  socket.emit("addMyself", user)

  socket.on("disconnect", () => {
    console.log("Client disconnected", user.name)

    connectedUsers = connectedUsers.filter((u) => u.id !== user.id)
    io.of("/").emit("userList", connectedUsers)
  })
})

app.use(express.static("client/build"))

server.listen(port, () => console.log(`Listening on port ${port}`))
