import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onlineUsers, userLoggedIn } from './ducks/actions';
import Chat from './Chat';
import SocketEvents from '../../../services/socketEvents';

export default (props) => {
  const user = localStorage.getItem('user');
  const { socket } = props;
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);

  // const checkIfUserExists = useCallback(() => {
  //   const sessionId = localStorage.getItem("sessionId");
  //   if (sessionId) {
  //     socket.auth = { sessionId: sessionId };
  //     socket.connect();
  //   }
  // }, [socket])

  useEffect(() => {
    // checkIfUserExists();
    socket.on(SocketEvents.CONNECT, () => {
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

    // socket.on(SocketEvents.DISCONNECT, () => {
    //   console.info('Disconnected');
    // })

    // socket.on(SocketEvents.SESSION, ({sessionId, userId, username, name, img}) => {
    //   socket.auth = {sessionId : sessionId}
    //   localStorage.setItem("sessionId", sessionId);
    //   dispatch(userLoggedIn({userId, username, name, img}))
    // })

    socket.emit('get_users');
    socket.on('users', (users) => {
      dispatch(onlineUsers(users));
    });
  }, [socket, messages, dispatch]);

  return <Chat socket={socket} />;
};
