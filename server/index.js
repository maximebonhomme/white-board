const express = require("express")
const http = require("http")
const socketIo = require("socket.io")
const randomName = require("node-random-name")

const {
  addUser,
  removeUser,
  getUser,
  getUserByIndex,
  getUsers,
} = require("./users")
const {
  setCurrentPath,
  setGameState,
  setCurrentPlayer,
  getCurrentPlayer,
  getCurrentPath,
  getGameState,
} = require("./game")
const {
  dispatchGameState,
  dispatchCurrentPlayer,
  dispatchCurrentPath,
  dispatchUserList,
} = require("./socketDispatcher")

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

const pickPlayer = () => {
  const currentPlayer = getCurrentPlayer()
  const users = getUsers()
  let nextPlayer

  if (currentPlayer === -1 || currentPlayer === users.length - 1) {
    nextPlayer = 0
  } else {
    nextPlayer = currentPlayer + 1
  }

  setCurrentPlayer({ currentPlayer: nextPlayer })

  io.of("/").emit(
    "updateCurrentPlayer",
    getUserByIndex({ index: nextPlayer }).id
  )
}

const updateState = (newState) => {
  setGameState({ newState })
  dispatchGameState({ io, payload: getGameState() })

  switch (getGameState()) {
    case 0:
      console.log("server gameState 0")
      break
    case 1:
      console.log("server gameState 1")
      pickPlayer()
      break
    case 2:
      console.log("server gameState 2")
      io.of("/").emit("updateCurrentPath", getCurrentPath())
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
  setCurrentPlayer({ currentPlayer: -1 })
  setCurrentPath({ path: [] })

  updateState(0)

  dispatchCurrentPlayer({ io, payload: getCurrentPlayer() })
  dispatchCurrentPath({ io, payload: getCurrentPath() })
}

io.on("connection", (socket) => {
  console.log("Client connected", socket.id)

  const user = addUser({ id: socket.id, name: randomName() })

  dispatchUserList({ io, payload: getUsers() })
  socket.emit("addMyself", user)

  socket.on("clientSendPath", (data) => {
    setCurrentPath({ path: data })
    updateState(2)
  })

  socket.on("clientMouseUpdate", (data) => {
    socket.broadcast.emit("cursorUpdate", data)
  })

  if (getUsers().length > 1 && !getGameState()) {
    updateState(1)
  }

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id)

    removeUser({ id: socket.id })
    dispatchUserList({ io, payload: getUsers() })
    if (getUsers().length <= 1 && getGameState() > 0) {
      resetGameState()
    }
  })
})

app.use(express.static("client/build"))

server.listen(port, () => console.log(`Listening on port ${port}`))
