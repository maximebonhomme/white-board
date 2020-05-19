import React, { useContext } from "react"

import { UsersContext } from "../../context/UsersContext"

const UserList = () => {
  const { state } = useContext(UsersContext)

  return (
    <>
      <h2>Users connected:</h2>

      <ul>
        {state.users.map(({ id, name, color }) => {
          const isMyself = id === state.myself.id

          return (
            <li style={{ color: isMyself ? "#000" : color }} key={id}>
              {name}
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default UserList
