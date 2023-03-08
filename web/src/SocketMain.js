import React, { useEffect, useState } from "react";
import SocketEvents from './SocketEvents'
export default function SocketMain({ setToken, socket }) {
  const [username, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [newUser, setNewUser] = useState();
  const user = localStorage.getItem('user');
  
  async function loginUser() {
    socket.connect('https://community.limkokwing.net');


    return fetch("https://community.limkokwing.net/", {
      withCredentials: true,
      method: "POST",
      headers: {  
        authentication: "token",
        student_name: "afzal",
        student_id:"123",
        "Content-type":"application/json"
      },
   
      // body: JSON.stringify(credentials),
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bold = await loginUser({
      username,
      message,
    });
    socket.auth = { username: newUser };
    socket.connect();
    setToken(bold, newUser);
    setNewUser([newUser, message, username]);
    console.log(bold, "tokennnn");
  };



useEffect(() => {
  socket.on('send_messages', () => {
      // socket.emit('authorization', { authorization: token, name: user }) //send the jwt
      //   console.log('Hello WOrld')
      //     .on('authorization', () => {
      //       //do other things
      //       console.log('hello world')
      //     })
      //     .on('unauthorized', (msg) => {
      //       console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
      //       throw new Error(msg.data.type);
      //     })
    });
if(setToken){
  socket.emit("get_users", ({from:socketID, username})=>{
    setNewUser(socketID, username)
  })
  socket.on("users", ({to:socketID, username})=>{
    setNewUser(socketID, username)
  })
}


}, [])



  
  return (
    <div>
      <form onSubmit={handleSubmit} style={{display:"flex", width:"100%", alignItems:"end"}}>
        <label style={{ width:"20%"}}>
          <p>Username</p>
          <input type="text" style={{width:"100%", height:"40px"}} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <label style={{ width:"60%"}}>
          <p>Message</p>
          <input type="text" style={{width:"100%", height:"40px"}} onChange={(e) => setUserName(e.target.value)} />
        </label>
        <button style={{padding:"10px 30px",fontSize:"14px", height:"46px"}} type="submit">Submit</button>

       
      </form>
      <br/>
      <br/>
      <div>

          <h2>Print Here</h2>
          <h3>{newUser}</h3>
          {console.log(newUser,'newuser')}
        </div>
    </div>
  );
}
