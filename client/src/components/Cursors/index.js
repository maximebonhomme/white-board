import React, { useEffect, useContext, useRef } from "react"
import styled from "@xstyled/styled-components"
import { useMouse } from "react-use"

import { UsersContext } from "../../context/UsersContext"
import { SocketContext } from "../../context/SocketContext"

const CURSOR_SIZE = 10

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Cursor = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: ${CURSOR_SIZE}px;
  height: ${CURSOR_SIZE}px;
  border-radius: 50%;
  background-color: ${(p) => p.color};
`

const Cursors = () => {
  const { state } = useContext(UsersContext)
  const { socket } = useContext(SocketContext)
  const containerRef = useRef(null)
  const { elX, elY } = useMouse(containerRef)

  useEffect(() => {
    socket.emit("clientMouseUpdate", {
      id: state.myself.id,
      color: state.myself.color,
      x: elX,
      y: elY,
    })
  }, [elX, elY, socket, state])

  useEffect(() => {
    socket.on("cursorUpdate", (data) => {
      const el = document.getElementById(data.id)
      const x = data.x - CURSOR_SIZE / 2
      const y = data.y - CURSOR_SIZE / 2

      if (el) el.style.transform = `translate(${x}px, ${y}px)`
    })
  }, [socket])

  return (
    <Container ref={containerRef}>
      {state.users.map(({ id, color }) => {
        const isMyself = id === state.myself.id
        if (isMyself) return null

        return <Cursor id={id} color={color} />
      })}
      <div>cursors</div>
    </Container>
  )
}

export default Cursors
