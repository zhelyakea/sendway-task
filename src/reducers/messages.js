import * as actionTypes from '../constants/actionTypes';

const initial = {
  messages: [],
  status: false
};
export default function messages(state = initial, action) {
  const newstate = {...state}
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      newstate.messages.push(action.message)
      return newstate
    case actionTypes.CONNECT:
      newstate.status = true
      return newstate
    case actionTypes.DISCONNECT:
      newstate.status = false
      return newstate
    default:
      return newstate;
  }
}
