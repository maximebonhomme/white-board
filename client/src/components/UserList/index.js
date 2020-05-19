import React, { useContext } from "react"

import { UsersContext } from "../../context/UsersContext"

const UserList = () => {
  const { state } = useContext(UsersContext)

  return (
    <>
      <div>Userlist:</div>

      {state.users.map(({ id, name, color }) => {
        const isMyself = id === state.myself.id

        return (
          <div style={{ color: isMyself ? "#000" : color }} key={id}>
            {name}
          </div>
        )
      })}
    </>
  )
}

export default UserList
