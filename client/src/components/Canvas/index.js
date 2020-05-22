import React, { useRef, useEffect, useCallback, useContext } from "react"
import * as PIXI from "pixi.js"
import { useWindowSize } from "react-use"

import Cursors from "../Cursors"

import DragCircle from "./DragCircle"
import Path from "./Path"

import { DRAG_RADIUS } from "./constants"

import { GameContext } from "../../context/GameContext"
import { UsersContext } from "../../context/UsersContext"

import { Container, StyledCanvas } from "./styles"

const Canvas = () => {
  const gameCtx = useContext(GameContext)
  const usersCtx = useContext(UsersContext)
  const { width, height } = useWindowSize()
  const canvasRef = useRef(null)
  const app = useRef(null)

  const dragCircle = useRef(null)
  const path = useRef(null)

  const mainLoop = useCallback(() => {
    if (
      path &&
      path.current &&
      dragCircle &&
      dragCircle.current &&
      path.current.lastPoint.x !== dragCircle.current.position.x &&
      path.current.lastPoint.y !== dragCircle.current.position.y
    ) {
      // add new point to path from dragCircle position
      // only if the last point of path is different than current position
      path.current.addPoint = dragCircle.current.position
    }
  }, [dragCircle, path])

  const createPathAndDragCircle = () => {
    const { x, y } = { x: Math.random() * width, y: Math.random() * height }

    dragCircle.current = new DragCircle(x, y, DRAG_RADIUS)
    path.current = new Path([dragCircle.current.position])

    app.current.stage.addChild(path.current.pixiObject)
    app.current.stage.addChild(dragCircle.current.pixiObject)
  }

  useEffect(() => {
    app.current = new PIXI.Application({
      width: width,
      height: height,
      transparent: true,
      resolution: 1,
    })
    canvasRef.current.appendChild(app.current.view)

    app.current.ticker.add(mainLoop)

    return () => {
      app.current.destroy(true, true)
    }
  }, [canvasRef, width, height, mainLoop])

  useEffect(() => {
    if (
      gameCtx.state.gameState === 1 &&
      gameCtx.state.currentPlayer === usersCtx.state.myself.id
    ) {
      console.log("ITS ME")
    }
  }, [gameCtx, usersCtx])

  return (
    <Container>
      <Cursors />
      <StyledCanvas ref={canvasRef} />
    </Container>
  )
}

export default Canvas
