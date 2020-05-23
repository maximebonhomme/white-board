import React, { useReducer, useEffect, useContext } from "react"
import PropTypes from "prop-types"

import usersReducer from "../reducers/usersReducer"
import { ADD_MYSELF, USER_LIST } from "../actions/usersActions"

import { SocketContext } from "./SocketContext"

const initialState = {
  users: [],
  myself: null,
}

const UsersContext = React.createContext(initialState)

const UsersProvider = ({ children }) => {
  const { socket } = useContext(SocketContext)
  const [state, dispatch] = useReducer(usersReducer, initialState)

  useEffect(() => {
    socket.on(ADD_MYSELF, (user) => {
      dispatch({ type: ADD_MYSELF, payload: user })
    })

    socket.on(USER_LIST, (users) => {
      dispatch({ type: USER_LIST, payload: users })
    })

    return () => {
      socket.off(ADD_MYSELF).off(USER_LIST)
    }
  }, [dispatch, socket])

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
