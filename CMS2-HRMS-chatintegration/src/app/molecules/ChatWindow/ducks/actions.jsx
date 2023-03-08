// import axios from "../../../../services/axiosInterceptor";
import * as action_types from "./constants";
// import { apiMethod } from "../../../../configs/constants";


export const toggleChat = (status) => {
  return (dispatch) => {
    dispatch({
      type: action_types.CHAT_WINDOW,
      data: status,
    });
  };
};

export const userLoggedIn = (user) => {
  return (dispatch) => {
    dispatch({
      type: action_types.LOGGEDIN_USER,
      data: user,
    });
  };
};

export const selectedUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: action_types.SELECTED_USER,
      data: user,
    });
  };
};

export const onlineUsers = (users) => {
  return (dispatch) => {
    dispatch({
      type: action_types.CONNECTED_USERS,
      data: users,
    });
  };
};

export const storeMessages = (users) => {
  return (dispatch) => {
    dispatch({
      type: action_types.MESSAGES,
      data: users,
    });
  };
};