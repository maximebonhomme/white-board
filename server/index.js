const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const randomName = require("node-random-name")

const { addUser, removeUser, getUser, getUsers } = require("./users")
const { getNextPlayerIndex, getPlayerByIndex } = require("./game")

const app = express()
const port = process.env.PORT || 9000

const server = http.createServer(app)
const io = socketIo(server)

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
  gameState.currentPlayer = getNextPlayerIndex({ currentPlayer })
  const nextPlayer = getPlayerByIndex({ index: gameState.currentPlayer })

  io.of("/").emit("updateCurrentPlayer", nextPlayer.id)
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
  console.log("Client connected", socket.id)

  const user = addUser({ id: socket.id, name: randomName() })

  io.of("/").emit("userList", getUsers())
  socket.emit("addMyself", user)

  socket.on("clientSendPath", (data) => {
    gameState.currentPath = data
    updateState(2)
  })

  socket.on("clientMouseUpdate", (data) => {
    socket.broadcast.emit("cursorUpdate", data)
  })

  if (getUsers().length > 1 && !gameState.state) {
    updateState(1)
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id)

    removeUser({ id: socket.id })
    io.of("/").emit("userList", getUsers())
    if (getUsers().length <= 1 && gameState.state > 0) {
      resetGameState()
    }
  })
})

app.use(express.static("client/build"))

server.listen(port, () => console.log(`Listening on port ${port}`))
