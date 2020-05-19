import React from "react"

import { UsersProvider } from "./context/UsersContext"
import { SocketProvider } from "./context/SocketContext"

import UserList from "./components/UserList"
import Canvas from "./components/Canvas"

function App() {
  return (
    <SocketProvider>
      <UsersProvider>
        <UserList />
        <Canvas />
        <a
          style={{ position: "absolute", bottom: "20px", left: "20px" }}
          href="https://github.com/maximebonhomme/white-board"
        >
          Check code on github
        </a>
      </UsersProvider>
    </SocketProvider>
  )
}

export default App
