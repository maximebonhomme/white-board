import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
  useState,
} from "react"
import * as PIXI from "pixi.js"
import { useWindowSize } from "react-use"

import Cursors from "../Cursors"

import DragCircle from "./DragCircle"
import Path from "./Path"

import { DRAG_RADIUS } from "./constants"

import { GameContext } from "../../context/GameContext"
import { UsersContext } from "../../context/UsersContext"
import { SocketContext } from "../../context/SocketContext"

import { Container, StyledCanvas, LaunchButton } from "./styles"

const Canvas = () => {
  const gameCtx = useContext(GameContext)
  const usersCtx = useContext(UsersContext)
  const { socket } = useContext(SocketContext)

  const [showDoneButton, setDoneButton] = useState(false)
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
      // only if the last point of path is different from current position
      path.current.addPoint = dragCircle.current.position
    }
  }, [dragCircle, path])

  // create path and drag circle for later use
  // inactive by default
  const createPathAndDragCircle = () => {
    const { x, y } = { x: Math.random() * width, y: Math.random() * height }

    dragCircle.current = new DragCircle(x, y, DRAG_RADIUS)
    path.current = new Path([dragCircle.current.position])

    path.current.addToScene(app.current.stage)
    app.current.stage.addChild(dragCircle.current.pixiObject)
  }

  const createPath = () => {
    const { currentPath } = gameCtx.state
    if (!currentPath || !currentPath.length) return

    if (!path.current) {
      path.current = new Path(currentPath)
      path.current.addToScene(app.current.stage)
    } else {
      path.current.createPath = currentPath
    }

    path.current.showStartFinish()
  }

  const handleFinishDrawing = () => {
    socket.emit("clientSendPath", path.current.points)
    setDoneButton(false)
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
    switch (gameCtx.state.gameState) {
      case 0:
        console.log("client gameState 0")
        break
      case 1:
        console.log("client gameState 1")
        if (gameCtx.state.currentPlayer === usersCtx.state.myself.id) {
          console.log("is myself creating path")
          createPathAndDragCircle()
          // dragCircle.current.activate()
          setDoneButton(true)
        } else {
          console.log("is not myself waiting for path")
          // destroyPathAndDragCircle()
          setDoneButton(false)
        }
        break
      case 2:
        console.log("client gameState 2")
        if (dragCircle.current) dragCircle.current.clear()
        createPath()
        break
      case 3:
        console.log("client gameState 3")
        break
      case 4:
        console.log("client gameState 4")
        break
      case 5:
        console.log("client gameState 5")
        break
    }
  }, [gameCtx, usersCtx])

  return (
    <Container>
      <Cursors />
      <StyledCanvas ref={canvasRef} />
      {showDoneButton && (
        <LaunchButton onClick={handleFinishDrawing}>Launch race</LaunchButton>
      )}
    </Container>
  )
}

export default Canvas
