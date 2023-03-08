import React from "react";
import SocketMain from "./SocketMain";
import useToken from "./useToken";
import io from "socket.io-client";

export default function App() {
  const { token, setToken } = useToken();

  const socket = io("http://localhost:3005", {
    transportOptions: {
      polling: {
        extraHeaders: {
          authorization: "token",
          student_name: "ali",
          student_id: "123",
        },
      },
    },
    cors: {
      origin: "http://localhost:3005/",
      credentials: true,
    },
  });

  const a = socket.connect();
  // const socket = io("https://community.limkokwing.net/",{
  //   cors : {
  //     origin  : "*",
  //   }
  // })

  console.log(a, "socketmmmm");

  socket.on("connection", () => {
    console.log("yes");
  });

  if (!token) {
    return <SocketMain socket={socket} setToken={setToken} />;
  } else if (token) {
    return <p>i am ghori</p>;
  }

  return <div>vvv</div>;
}
