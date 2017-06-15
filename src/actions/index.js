
import * as actionTypes from 'constants/actionTypes';

export function connect() {
  return {
    type: actionTypes.CONNECT
  }
}
export function disconnect() {
  return {
    type: actionTypes.DISCONNECT
  }
}
export function post(message){
  return {
    type: actionTypes.POST
  }
}
export function add_message(message){
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message
  }
}
