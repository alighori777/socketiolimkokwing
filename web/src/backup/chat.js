import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import SocketEvents from "./SocketEvents";
// import { onlineUsers, userLoggedIn } from './ducks/actions';
// import { useSelector, useDispatch } from 'react-redux';
import * as action_types from "./constants";


function Chat() {
    // const ENTER_KEY_CODE = 13;
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [user, setUser] = useState("");
  const [client, setClient] = useState("");

  // const dispatch = useDispatch();
 
  // const selected = useSelector((state) => state.chat.user);




  const socket = io("https://community.limkokwing.net/", {
    extraHeaders: {
      authorization: 123,
      name: '',
    },
  });
  socket.connect();
  console.log(socket.connect(),'lllll');

  // const handleEnterKey = (event) => {
  //   if (event.keyCode === ENTER_KEY_CODE) {
  //     onMessageSubmit();
  //   }
  // };

 
  const onMessageSubmit = () => {
    socket.emit("send_message", { 
      message, 
      user,
      from: user.socketID,
      to: client.socketID,
     });

     const newMessage = {
      from: user.socketID,
      to: client.socketID,
      message
    };

    setChat([...message, ...user, newMessage ]);
  };



//   useEffect(() => {
//     // checkIfUserExists();
//     socket.on(SocketEvents.CONNECT, () => {
//       socket.emit('authorization', { authorization: token, name: user }) //send the jwt
//         console.log('Hello WOrld')
//           .on('authorization', () => {
//             //do other things
//             console.log('hello world')
//           })
//           .on('unauthorized', (msg) => {
//             console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
//             throw new Error(msg.data.type);
//           })
//     });
//     socket.on(SocketEvents.DISCONNECT, () => {
//       console.info('Disconnected');
//     })

//     socket.on(SocketEvents.SESSION, ({sessionId, userId, username, name, img}) => {
//       socket.auth = {sessionId : sessionId}
//       localStorage.setItem("sessionId", sessionId);
//       // dispatch(userLoggedIn({userId, username, name, img}))
//     })



//     socket.emit("get_users");
//     socket.on("users", (users) => {
// console.log(users, 'ussssssssssssss');
//     });
//   }, [socket, message]);

  // const socket = io("https://community.limkokwing.net", {
  //   extraHeaders: {
  //     authorization: token,
  //     name: users,
  //   },
  // });
  // socket.connect();
  // console.log(socket.connect, "socket");

  // from: socketID, to: socketID

  // socketID

  // useEffect(() => {
  //   socket.on("users", (data) => {
  //     setChat(data.socketID);
  //     console.log(data.socketID, "socketID");
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.emit("get_users", (data) => {
  //     setChat(data.socketID);
  //     console.log(data.socketID, "socketID");
  //   });
  // }, []);

  // useEffect(() => {
  //   socket.on("recieve_message", (data) => {
  //     setChat(data.message);
  //     console.log(data.message, "datas");
  //   });
  // }, []);

  return (
    <div className="card">
      <div>
        <h1>Messenger</h1>
        <input
          placeholder="user"
          value={user}
          onChange={(event) => {
            setUser(event.target.value);
          }}
          // onKeyDown={handleEnterKey}
        />
        <br />
        <input
          placeholder="message"
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
          // onKeyDown={handleEnterKey}
        />
        <br />
        <button onClick={onMessageSubmit}>Send Message</button>
      </div>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {chat}
      </div>
    </div>
  );
}

export default Chat;


