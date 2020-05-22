import { UPDATE_STATE, UPDATE_CURRENT_PLAYER } from "../actions/gameActions"

const gameReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, gameState: action.payload }
    case UPDATE_CURRENT_PLAYER:
      return { ...state, currentPlayer: action.payload }
    default:
      return
  }
}

export default gameReducer
