import React, { useRef, useEffect, useContext, useCallback } from "react"
import styled, { css } from "@xstyled/styled-components"
import { useMouse, useWindowSize } from "react-use"

import { UsersContext } from "../../context/UsersContext"
import { SocketContext } from "../../context/SocketContext"

const full = css`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Container = styled.div`
  position: fixed;
  ${full}
`

const StyledCanvas = styled.canvas`
  position: absolute;
  ${full}
`

const CURSOR_SIZE = 10

const Canvas = () => {
  const { state } = useContext(UsersContext)
  const { socket } = useContext(SocketContext)
  const canvasRef = useRef(null)
  const ctx = useRef(null)
  const { elX, elY } = useMouse(canvasRef)
  const { width, height } = useWindowSize()

  const drawPoint = useCallback(
    (x, y, color) => {
      const c = ctx.current
      c.clearRect(0, 0, width, height)

      c.fillStyle = color
      c.fillRect(x, y, CURSOR_SIZE, CURSOR_SIZE)
    },
    [ctx, width, height]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    ctx.current = canvas.getContext("2d")
  }, [canvasRef])

  useEffect(() => {
    const myselfX = elX - CURSOR_SIZE / 2
    const myselfY = elY - CURSOR_SIZE / 2

    // draw myself
    drawPoint(myselfX, myselfY, "black")

    // emit to others my position
    socket.emit("clientMouseUpdate", {
      ...state.myself,
      x: elX,
      y: elY,
    })
    socket.on("mouseUpdate", ({ x, y, color }) => {
      // draw others position
      drawPoint(x, y, color)
    })
  }, [elX, elY, width, height, socket, state])

  return (
    <Container>
      <StyledCanvas width={width} height={height} ref={canvasRef} />
    </Container>
  )
}

export default Canvas
