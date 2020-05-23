import {
  UPDATE_STATE,
  UPDATE_CURRENT_PLAYER,
  UPDATE_CURRENT_PATH,
} from "../actions/gameActions"

const gameReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, gameState: action.payload }
    case UPDATE_CURRENT_PLAYER:
      return { ...state, currentPlayer: action.payload }
    case UPDATE_CURRENT_PATH:
      return { ...state, currentPath: action.payload }
    default:
      return
  }
}

export default gameReducer
