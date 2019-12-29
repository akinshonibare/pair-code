import { SET_ROOM_DATA, SET_USER_DATA } from "../utils/constants";

const initialState = {
  user: {},
  room: {}
};

export function infoReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_DATA:
      return Object.assign({}, state, {
        user: action.payload
      });

    case SET_ROOM_DATA:
      return Object.assign({}, state, {
        room: action.payload
      });

    default:
      return state;
  }
}
