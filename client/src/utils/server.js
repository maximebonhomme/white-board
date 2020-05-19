let server = "https://white-board-test.herokuapp.com/"

const env = process.env.NODE_ENV

if (env === "development") {
  server = "http://127.0.0.1:9000"
}

export default server
