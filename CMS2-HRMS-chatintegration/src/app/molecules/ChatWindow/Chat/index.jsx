import React, { useCallback, useEffect } from 'react';
import { Card, Row } from 'antd';
import ChatHeader from '../ChatHeader';
import ChatInput from '../ChatInput';
import ChatBody from '../ChatBody';
import { useSelector, useDispatch } from 'react-redux';
import { onlineUsers, storeMessages } from '../ducks/actions';
import SocketEvents from '../../../../services/socketEvents';

export default ({ socket }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.chat.info);
  const users = useSelector((state) => state.chat.users);
  const selected = useSelector((state) => state.chat.user);
  const stat = useSelector((state) => state.chat.window);
  const messages = useSelector((state) => state.chat.messages);

  // const findUser = useCallback((userId) => {
  //   const userIndex = users.findIndex((u) => u.userId === userId)
  //   return userIndex >= 0;
  // }, [users]);

  // const handConnectionStatus = useCallback((userId, status) => {
  //   const userIndex = users.findIndex((u) => u.userId === userId);
  //   if (userIndex >= 0) {
  //     users[userIndex].connected = status;
  //     let temp = [...users]
  //     dispatch(onlineUsers(temp))
  //   }
  // },[users, dispatch])

  // const userConnected = useCallback(({ userId, username, name, img }) => {
  //   if (user.userId != userId) {
  //     const userExists = findUser(userId)
  //     if (userExists) {
  //       handConnectionStatus(userId, true)
  //     } else {
  //       const newUser = { userId, username, name, img, connected: true }
  //       let temp = [...users, newUser]
  //       dispatch(onlineUsers(temp))
  //     }
  //   }
  // }, [user, users, dispatch, findUser, handConnectionStatus])

  // const userDisconnected = useCallback(({ userId }) => handConnectionStatus(userId, false), [handConnectionStatus]);

  // const handleNewMessageStatus = useCallback((userId, status) => {
  //   const userIndex = users.findIndex((u) => u.userId === userId);
  //   if (userIndex >= 0) {
  //     users[userIndex].hasNewMessage = status;
  //     let temp = [...users]
  //     dispatch(onlineUsers(temp))
  //   }
  // },[users, dispatch])

  // const privateMessage = useCallback(({content, from, to}) => {
  //   if(selected.userId) {
  //     if(selected.userId === from) {
  //       const newMessage = {
  //         userId: from,
  //         message: content,
  //       }
  //       dispatch(storeMessages([...messages, newMessage]))
  //     } else {
  //       handleNewMessageStatus(from, true);
  //     }
  //   } else {
  //     handleNewMessageStatus(from, true);
  //   }

  // }, [messages, dispatch, handleNewMessageStatus])

  const userMessages = useCallback(
    ({ messages }) => {
      const chatMessages = [];
      console.log('checking', messages);
      messages.forEach(() => {
        // chatMessages.push({from: from, message: message});
        // dispatch(storeMessages([...chatMessages]))
      });
    },
    [dispatch],
  );

  useEffect(() => {
    // socket.on(SocketEvents.USER_CONNECTED, (user) => userConnected(user));
    // socket.on(SocketEvents.USER_DISCONNECTED, (user) => userDisconnected(user));
    // socket.on(SocketEvents.PRIVATE_MESSAGE, (message) => privateMessage(message));
    socket.on(SocketEvents.USER_MESSAGES, (messages) => userMessages(messages));
  }, [socket, privateMessage]);

  const sendMessage = (messi) => {
    socket.emit(SocketEvents.PRIVATE_MESSAGE, {
      from: user.socketID,
      to: selected.socketID,
      message: messi,
    });
    const newMess = {
      type: 'message',
      from: user.socketID,
      to: selected.socketID,
      message: messi,
    };
    dispatch(storeMessages([...messages, newMess]));
  };

  return (
    <Card bordered={false} className={`uni-card b-dark-gray no-padding chat-window ${stat ? 'active' : ''}`}>
      <Row gutter={[0, 0]} className="h-100">
        {/* <ChatHeader user={selected} /> */}
        {/* <ChatBody messages={messages} user={user} /> */}
        <ChatInput socket={socket} sendMessage={sendMessage} />
      </Row>
    </Card>
  );
};
