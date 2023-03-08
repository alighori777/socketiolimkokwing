import * as action_types from "./constants";

const initialState = {
  info: {},
  user: {},
  users: [],
  messages: [],
  window: false
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.SELECTED_USER:
      return { ...state, user : data };
    case action_types.CONNECTED_USERS:
      return { ...state, users: data };
    case action_types.CHAT_WINDOW:
      return { ...state, window: data };
    case action_types.LOGGEDIN_USER:
      return { ...state, info: data };
    case action_types.MESSAGES:
      return { ...state, messages: data };
    default:
      return state;
  }
};