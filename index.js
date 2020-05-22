const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const randomName = require("node-random-name")

const app = express()
const port = process.env.PORT || 9000

const server = http.createServer(app)
const io = socketIo(server)

let connectedUsers = []

// states:
// 0: waiting for players (min 2)
// 1: pick player to draw
// 2: player finish drawing - send path to other players
// 3: game running
// 4: 1 player finished, start end timer (X sec)
// 5: game finished - apply points

let gameState = {
  state: 0,
  currentPlayer: 0,
}

const updateState = (newState) => {
  gameState.state = newState
  io.of("/").emit("updateGameState", gameState.state)

  switch (gameState.state) {
    case 0:
      return
    case 1:
    // pick player
    case 2:
    // send path to players
    case 3:
    // game running
    // start server timer
    case 4:
    // start server timer2
    case 5:
    // apply points
    // back to case 1
  }
}

io.on("connection", (socket) => {
  const user = {
    id: socket.id,
    name: randomName(),
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }
  // console.log("Client connected", user.name)

  connectedUsers.push(user)

  if (connectedUsers.length > 1 && !gameState.state) {
    updateState(1)
  }

  socket.on("clientMouseUpdate", (data) => {
    socket.broadcast.emit("cursorUpdate", data)
  })

  io.of("/").emit("userList", connectedUsers)
  socket.emit("addMyself", user)

  socket.on("disconnect", () => {
    // console.log("Client disconnected", user.name)

    connectedUsers = connectedUsers.filter((u) => u.id !== user.id)
    io.of("/").emit("userList", connectedUsers)
    if (connectedUsers.length <= 1 && gameState.state > 0) {
      updateState(0)
    }
  })
})

app.use(express.static("client/build"))

server.listen(port, () => console.log(`Listening on port ${port}`))
