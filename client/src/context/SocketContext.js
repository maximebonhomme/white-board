import React from "react"
import PropTypes from "prop-types"
import io from "socket.io-client"

import server from "../utils/server"

const initialState = {
  socket: io(server),
}

const SocketContext = React.createContext(initialState)

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={initialState}>
      {children}
    </SocketContext.Provider>
  )
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export { SocketContext, SocketProvider }
