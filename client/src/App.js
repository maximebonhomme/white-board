import React from "react"

import { UsersProvider } from "./context/UsersContext"

import UserList from "./components/UserList"

function App() {
  return (
    <UsersProvider>
      <UserList />
    </UsersProvider>
  )
}

export default App
