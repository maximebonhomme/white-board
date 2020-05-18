let URL = "https://white-board-test.herokuapp.com/"

const server = () => {
  const env = process.env.NODE_ENV

  if (env === "development") {
    URL = "http://127.0.0.1:9000"
  }

  return URL
}

export default server
