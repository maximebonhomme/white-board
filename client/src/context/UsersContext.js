import React, { useReducer, useEffect } from "react"
import PropTypes from "prop-types"
import io from "socket.io-client"

import usersReducer from "../reducers/usersReducer"
import { ADD_MYSELF, USER_LIST } from "../actions/usersActions"

import server from "../utils/server"

const initialState = {
  users: [],
  myself: { id: -1 },
}

const UsersContext = React.createContext(initialState)

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState)

  useEffect(() => {
    const socket = io(server)

    socket.on(ADD_MYSELF, (user) => {
      dispatch({ type: ADD_MYSELF, payload: user })
    })

    socket.on(USER_LIST, (users) => {
      dispatch({ type: USER_LIST, payload: users })
    })

    return () => {
      socket.off(ADD_MYSELF).off(USER_LIST)
    }
  }, [dispatch])

  return (
    <UsersContext.Provider value={{ state, dispatch }}>
      {children}
    </UsersContext.Provider>
  )
}

UsersProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { UsersContext, UsersProvider }
