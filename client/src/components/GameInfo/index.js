import React, { useContext } from "react"
import styled from "@xstyled/styled-components"

import { GameContext } from "../../context/GameContext"

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
`

const cleanState = {
  0: "waiting for players",
  1: "picked player to draw",
  2: "player finish drawing - path sent to other players",
  3: "game running",
  4: "1 player finished, start end timer (X sec)",
  5: "game finished - apply points",
}

const GameInfo = () => {
  const { state } = useContext(GameContext)

  return (
    <Container>
      <div>myPoints: {state.points}</div>
      <div>gameState: {state.gameState}</div>
      <div>cleanState: {cleanState[state.gameState]}</div>
      <div>currentPlayer: {state.currentPlayer}</div>
      <div>currentPath: {state.currentPath && state.currentPath.length}</div>
    </Container>
  )
}

export default GameInfo
