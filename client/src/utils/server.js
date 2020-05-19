let server = "https://white-board-test.herokuapp.com/"

if (process.env.NODE_ENV === "development") {
  server = "http://127.0.0.1:9000"
}

export default server
