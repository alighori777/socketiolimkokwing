import * as action_types from "./constants";

const initialState = {
  teamMarketingList: [],
  forYouList: [],
  chat: false
};

export default (state = initialState, action) => {
  const { type, data } = action;
  switch (type) {
    case action_types.TEAM_UPDATES_MARKETING:
      return { ...state, teamMarketingList: data };
    case action_types.FORYOU_UPDATES_MARKETING:
      return { ...state, forYouList: data };
    case action_types.CHAT:
      return { ...state, chat: data };
    default:
      return state;
  }
};