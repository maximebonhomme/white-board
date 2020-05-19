import React from "react"

import { UsersProvider } from "./context/UsersContext"

import UserList from "./components/UserList"

function App() {
  return (
    <UsersProvider>
      <UserList />
      <a
        style={{ position: "absolute", bottom: "20px", left: "20px" }}
        href="https://github.com/maximebonhomme/white-board"
      >
        Check code on github
      </a>
    </UsersProvider>
  )
}

export default App
