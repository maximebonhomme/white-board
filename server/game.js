const { getUsers } = require("./users")

const getNextPlayerIndex = ({ currentPlayer }) => {
  const users = getUsers()
  let nextUserIndex

  if (currentPlayer === -1 || currentPlayer === users.length) {
    nextUserIndex = 0
  } else {
    nextUserIndex = currentPlayer + 1
  }

  return nextUserIndex
}

const getPlayerByIndex = ({ index }) => {
  const users = getUsers()
  return users[index]
}

module.exports = { getNextPlayerIndex, getPlayerByIndex }
