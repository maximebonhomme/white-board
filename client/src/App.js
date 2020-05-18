import React, { useState, useEffect } from "react"
import io from "socket.io-client"

function App() {
  const [response, setResponse] = useState("")

  useEffect(() => {
    const socket = io("http://127.0.0.1:9000")
    socket.on("FromAPI", (data) => {
      setResponse(data)
    })
  }, [])

  return <div>{response}</div>
}

export default App
