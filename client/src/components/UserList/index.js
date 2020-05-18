import React, { useContext, useEffect } from "react"
import io from "socket.io-client"

import server from "../../utils/server"

import { UsersContext } from "../../context/UsersContext"

const UserList = () => {
  const { state, dispatch } = useContext(UsersContext)

  const addUser = (id) => {
    dispatch({ type: "add", payload: id })
  }

  const removeUser = (id) => {
    dispatch({ type: "remove", payload: id })
  }

  useEffect(() => {
    const socket = io(server)

    socket.on("addUser", addUser)

    socket.on("removeUser", removeUser)

    return () => {
      socket.off("addUser").off("removeUser")
    }
  }, [])

  return (
    <div>
      <div>userlist</div>
      <div>
        {state.users.map((u) => (
          <div key={u.id}>{u.name}</div>
        ))}
      </div>
    </div>
  )
}

export default UserList
