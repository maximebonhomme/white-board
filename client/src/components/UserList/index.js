import React, { useContext } from "react"

import { UsersContext } from "../../context/UsersContext"

const UserList = () => {
  const { state } = useContext(UsersContext)

  return (
    <>
      <div>Userlist:</div>

      {state.users.map(({ id, name }) => {
        const isMyself = id === state.myself.id

        return (
          <div style={{ color: isMyself ? "green" : "black" }} key={id}>
            {name}
          </div>
        )
      })}
    </>
  )
}

export default UserList
