import React, { useContext } from "react"

import { UsersContext } from "../../context/UsersContext"

const UserList = () => {
  const { state } = useContext(UsersContext)

  return (
    <>
      <div>Userlist:</div>

      {state.users.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </>
  )
}

export default UserList
