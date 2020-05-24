const users = []

const addUser = ({ id, name }) => {
  const existingUser = users.find((user) => user.id === id)
  if (existingUser) return { error: "User already exists." }

  const user = {
    id: id,
    name: name,
    color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
  }

  users.push(user)

  return user
}

const removeUser = ({ id }) => {
  const index = users.findIndex((u) => u.id === id)

  if (index !== -1) return users.splice(index, 1)[0]
}

const getUser = ({ id }) => {
  return users.find((u) => u.id === id)
}

const getUsers = () => {
  return users
}

module.exports = { addUser, removeUser, getUser, getUsers }
