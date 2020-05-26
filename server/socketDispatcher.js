const dispatchGameState = ({ io, payload }) => {
  io.of("/").emit("updateGameState", payload)
}

const dispatchCurrentPlayer = ({ io, payload }) => {
  io.of("/").emit("updateCurrentPlayer", payload)
}

const dispatchCurrentPath = ({ io, payload }) => {
  io.of("/").emit("updateCurrentPath", payload)
}

const dispatchUserList = ({ io, payload }) => {
  io.of("/").emit("userList", payload)
}

module.exports = {
  dispatchGameState,
  dispatchCurrentPlayer,
  dispatchCurrentPath,
  dispatchUserList,
}
