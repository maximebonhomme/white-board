let URL = "https://white-board-test.herokuapp.com/"

const server = () => {
  const env = process.env.NODE_ENV

  if (env === "development") {
    URL = "http://localhost:3000"
  }

  return URL
}

export default server
