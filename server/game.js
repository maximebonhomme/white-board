const state = {
  state: 0,
  currentPlayer: -1,
  currentPath: [],
}

const setCurrentPath = ({ path }) => {
  state.currentPath = path
  return state.currentPath
}

const setGameState = ({ newState }) => {
  state.state = newState
  return state.state
}

const setCurrentPlayer = ({ currentPlayer }) => {
  state.currentPlayer = currentPlayer
  return state.currentPlayer
}

const getState = () => {
  return state
}

const getCurrentPlayer = () => {
  return state.currentPlayer
}

const getCurrentPath = () => {
  return state.currentPath
}

const getGameState = () => {
  return state.state
}

module.exports = {
  setCurrentPath,
  setGameState,
  setCurrentPlayer,
  getState,
  getCurrentPlayer,
  getCurrentPath,
  getGameState,
}
