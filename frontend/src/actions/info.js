// imports
import { SET_ROOM_DATA, SET_USER_DATA } from "../utils/constants";

// action creators
export function setRoom(data) {
  return { type: SET_ROOM_DATA, payload: data };
}

export function setUser(data) {
  return { type: SET_USER_DATA, payload: data };
}
