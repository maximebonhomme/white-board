import { ADD_MYSELF, USER_LIST } from "../actions/usersActions"

const userReducer = (state, action) => {
  switch (action.type) {
    case ADD_MYSELF:
      return { ...state, myself: action.payload }
    case USER_LIST:
      return { ...state, users: action.payload }
    default:
      return
  }
}

export default userReducer
