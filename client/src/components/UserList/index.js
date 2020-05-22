import React, { useContext } from "react"

import { UsersContext } from "../../context/UsersContext"

import { Container, List } from "./styles"

const UserList = () => {
  const { state } = useContext(UsersContext)
  if (!state.myself) return null

  return (
    <Container>
      <List>
        {state.users.map(({ id, name, color }) => {
          const isMyself = id === state.myself.id

          return (
            <li style={{ color }} key={id}>
              {name} {isMyself && "(you)"}
            </li>
          )
        })}
      </List>
    </Container>
  )
}

export default UserList
