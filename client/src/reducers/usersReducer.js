import generateName from "../utils/generateName"
import { ADD_USER, REMOVE_USER } from "../actions/usersActions"

const addUser = (users, id) => {
  const u = {
    id,
    name: generateName(),
  }

  return [...users, u]
}

const removeUser = (users, id) => {
  const u = users.filter((user) => user.id !== id)

  return u
}

const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...state, users: addUser(state.users, action.payload) }
    case REMOVE_USER:
      return { ...state, users: removeUser(state.users, action.payload) }
    default:
      return
  }
}

export default userReducer
