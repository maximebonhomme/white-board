const express = require("express")
const http = require("http")
const socketIo = require("socket.io")

const production = process.env.NODE_ENV === "production"

const app = express()
const port = process.env.PORT || 9000
const build = production ? "client/src" : "client/build"

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

console.log("_______")
console.log(production)
console.log(port)
console.log(build)
console.log(express.static(build))

app.use(express.static(build))

server.listen(port, () => console.log(`Listening on port ${port}`))
