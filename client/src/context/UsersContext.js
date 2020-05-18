import React, { useReducer } from "react"
import generateName from "../utils/generateName"

const addUser = (users, id) => {
  const u = {
    id,
    name: generateName(),
  }

  return [...users, u]
}

const removeUser = (users, id) => {
  const u = users.filter((user) => user.id !== id)

  return u
}

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return { ...state, users: addUser(state.users, action.payload) }
    case "remove":
      return { ...state, users: removeUser(state.users, action.payload) }
    default:
      return
  }
}

const initialState = {
  users: [],
}

const UsersContext = React.createContext(initialState)

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}

export { UsersContext, UsersProvider }
