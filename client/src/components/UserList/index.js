import React, { useContext } from "react"

import Users from "../../containers/Users"
import { UsersContext } from "../../context/UsersContext"

const UserList = () => {
  const { state } = useContext(UsersContext)

  return (
    <Users>
      <div>Userlist:</div>

      {state.users.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </Users>
  )
}

export default UserList
