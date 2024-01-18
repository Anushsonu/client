import react, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const sendMessage = () => {
    console.log("first");
    socket.emit("send_message", { message: message });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived([...messageReceived, data.message]);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send message</button>
      <h3>Messages:</h3>
      {messageReceived}
    </div>
  );
}

export default App;
