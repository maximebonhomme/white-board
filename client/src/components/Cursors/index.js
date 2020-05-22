import React, { useEffect, useContext, useRef } from "react"
import { useMouse } from "react-use"

import { UsersContext } from "../../context/UsersContext"
import { SocketContext } from "../../context/SocketContext"

import { CURSOR_SIZE } from "./constants"
import { Container, Cursor } from "./styles"

const Cursors = () => {
  const { state } = useContext(UsersContext)
  const { socket } = useContext(SocketContext)
  const containerRef = useRef(null)
  const { elX, elY } = useMouse(containerRef)

  useEffect(() => {
    if (!state.myself) return
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

    return () => {
      socket.off("cursorUpdate")
    }
  }, [socket])

  return (
    <Container ref={containerRef}>
      {state.users.map(({ id, color }) => {
        if (!state.myself) return null
        const isMyself = id === state.myself.id
        if (isMyself) return null

        return <Cursor key={id} id={id} color={color} />
      })}
    </Container>
  )
}

export default Cursors
