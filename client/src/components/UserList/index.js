import React, { useContext, useEffect } from "react"
import io from "socket.io-client"

import server from "../../utils/server"

import { UsersContext } from "../../context/UsersContext"

const UserList = () => {
  const { state, dispatch } = useContext(UsersContext)

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
