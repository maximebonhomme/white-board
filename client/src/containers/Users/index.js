import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import io from "socket.io-client"

import server from "../../utils/server"

import { UsersContext } from "../../context/UsersContext"

const Users = ({ children }) => {
  const { dispatch } = useContext(UsersContext)

  useEffect(() => {
    const socket = io(server)

    socket.on("addUser", (id) => {
      dispatch({ type: "add", payload: id })
    })

    socket.on("removeUser", (id) => {
      dispatch({ type: "remove", payload: id })
    })

    return () => {
      socket.off("addUser").off("removeUser")
    }
  }, [dispatch])

  return <>{children}</>
}

Users.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Users
