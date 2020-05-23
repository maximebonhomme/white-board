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
  currentPlayer: -1,
  currentPath: [],
}

const pickPlayer = () => {
  const { currentPlayer } = gameState

  if (currentPlayer === -1 || currentPlayer === connectedUsers.length) {
    gameState.currentPlayer = 0
  } else {
    gameState.currentPlayer = gameState.currentPlayer + 1
  }

  io.of("/").emit(
    "updateCurrentPlayer",
    connectedUsers[gameState.currentPlayer].id
  )
}

const updateState = (newState) => {
  gameState.state = newState
  io.of("/").emit("updateGameState", gameState.state)

  switch (gameState.state) {
    case 0:
      console.log("server gameState 0")
      break
    case 1:
      console.log("server gameState 1")
      pickPlayer()
      break
    case 2:
      console.log("server gameState 2")
      io.of("/").emit("updateCurrentPath", gameState.currentPath)
      break
    case 3:
      console.log("server gameState 3")
      // game running
      // start server timer
      break
    case 4:
      console.log("server gameState 4")
      // start server timer2
      break
    case 5:
      console.log("server gameState 5")
      // apply points
      // back to case 1
      break
  }
}

const resetGameState = () => {
  gameState.currentPlayer = -1
  gameState.currentPath = []

  updateState(0)
  io.of("/").emit("updateCurrentPlayer", gameState.currentPlayer)
  io.of("/").emit("updateCurrentPath", gameState.currentPath)
}

io.on("connection", (socket) => {
  const user = {
    id: socket.id,
    name: randomName(),
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }
  console.log("Client connected", user.name)

  connectedUsers.push(user)

  io.of("/").emit("userList", connectedUsers)
  socket.emit("addMyself", user)

  socket.on("clientSendPath", (data) => {
    gameState.currentPath = data
    updateState(2)
  })

  socket.on("clientMouseUpdate", (data) => {
    socket.broadcast.emit("cursorUpdate", data)
  })

  if (connectedUsers.length > 1 && !gameState.state) {
    updateState(1)
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected", user.name)

    connectedUsers = connectedUsers.filter((u) => u.id !== user.id)
    io.of("/").emit("userList", connectedUsers)
    if (connectedUsers.length <= 1 && gameState.state > 0) {
      resetGameState()
    }
  })
})

app.use(express.static("client/build"))

server.listen(port, () => console.log(`Listening on port ${port}`))
