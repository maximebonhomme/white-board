import React from "react"

import { UsersProvider } from "./context/UsersContext"
import { GameProvider } from "./context/GameContext"
import { SocketProvider } from "./context/SocketContext"

import UserList from "./components/UserList"
import Canvas from "./components/Canvas"
import GameInfo from "./components/GameInfo"

function App() {
  return (
    <SocketProvider>
      <UsersProvider>
        <GameProvider>
          <UserList />
          <Canvas />
          <GameInfo />
          <a
            style={{ position: "absolute", bottom: "20px", left: "20px" }}
            href="https://github.com/maximebonhomme/white-board"
          >
            Check code on github
          </a>
        </GameProvider>
      </UsersProvider>
    </SocketProvider>
  )
}

export default App
