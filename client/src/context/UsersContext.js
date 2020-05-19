import React, { useReducer, useEffect } from "react"
import PropTypes from "prop-types"
import io from "socket.io-client"

import usersReducer from "../reducers/usersReducer"
import { ADD_USER, REMOVE_USER } from "../actions/usersActions"

import server from "../utils/server"

const initialState = {
  users: [],
}

const UsersContext = React.createContext(initialState)

const UsersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(usersReducer, initialState)

  useEffect(() => {
    const socket = io(server)

    socket.on(ADD_USER, (id) => {
      dispatch({ type: ADD_USER, payload: id })
    })

    socket.on(REMOVE_USER, (id) => {
      dispatch({ type: REMOVE_USER, payload: id })
    })

    return () => {
      socket.off(ADD_USER).off(REMOVE_USER)
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
