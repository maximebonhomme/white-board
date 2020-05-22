import { UPDATE_STATE } from "../actions/gameActions"

const gameReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_STATE:
      return { ...state, gameState: action.payload }
    default:
      return
  }
}

export default gameReducer
