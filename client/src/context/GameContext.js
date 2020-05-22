import React, { useReducer, useEffect, useContext } from "react"
import PropTypes from "prop-types"

import gameReducer from "../reducers/gameReducer"

import { SocketContext } from "./SocketContext"

import { UPDATE_STATE, UPDATE_CURRENT_PLAYER } from "../actions/gameActions"

// states:
// 0: waiting for players
// 1: pick player to draw
// 2: player finish drawing - send path to other players
// 3: game running
// 4: 1 player finished, start end timer (X sec)
// 5: game finished - apply points

const initialState = {
  currentPlayer: -1,
  points: 0,
  gameState: 0,
  isOnPath: false,
  hasFinished: false,
  timeToFinish: null,
}

const GameContext = React.createContext(initialState)

const GameProvider = ({ children }) => {
  const { socket } = useContext(SocketContext)
  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    socket.on(UPDATE_STATE, (gameState) => {
      dispatch({ type: UPDATE_STATE, payload: gameState })
    })

    socket.on(UPDATE_CURRENT_PLAYER, (currentPlayer) => {
      dispatch({ type: UPDATE_CURRENT_PLAYER, payload: currentPlayer })
    })

    return () => {
      socket.off(UPDATE_STATE)
    }
  }, [dispatch, socket])

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  )
}

GameProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { GameContext, GameProvider }
