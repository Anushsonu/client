import React, { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [username, setUsername] = useState("");

  const sendMessage = () => {
    if (username === "") {
      alert("Please enter your name before sending a message.");
      return;
    }
    if (message === "") {
      alert("Message is empty. Please enter a message");
      return;
    }
    socket.emit("send_message", { username, message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived([...messageReceived, data]);
    });
  }, [messageReceived]);

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-500">
      <div className="shadow-lg rounded-lg w-[600px] h-[600px] flex flex-col justify-center items-center bg-white">
        <div className="w-full pl-5">
          <input
            className="border border-gray-300 rounded-lg outline-none w-[300px] my-3 px-2 py-1 text-xl"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="border border-gray-300 m-2 w-[95%] h-[90%] overflow-y-scroll flex flex-col">
          {messageReceived.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full">
              <div className="text-blue-400 text-4xl">Welcome !</div>
              <div className="text-xl text-gray-500 mt-5">
                Type a message and start chatting
              </div>
            </div>
          ) : (
            <div>
              {messageReceived.map((msg, index) => (
                <div key={index} className="p-2 m-2">
                  <div className="text-2xl w-[400px]">
                    <div className="text-blue-500">{msg.username}: </div>
                    <div className="break-all bg-blue-200 p-2 rounded-2xl rounded-tl-none mt-2">
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between w-full p-3">
          <input
            className="w-full px-3 py-1 mr-3 rounded-lg border border-gray-300 focus:outline-none"
            placeholder="Message ..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="p-2 bg-green-300 rounded-lg" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
